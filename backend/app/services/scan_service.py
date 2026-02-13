"""
Scan service for database operations
Handles CRUD operations for scans
"""

from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from app.models.scan import Scan, ScanStatus
from app.models.vulnerability import Vulnerability
from app.schemas.scan import ScanCreate, ScanUpdate
from app.services.scanner import SecurityScanner


async def create_scan(db: Session, scan_data: ScanCreate, user_id: int) -> Scan:
    """Create a new scan"""
    db_scan = Scan(
        user_id=user_id,
        target_url=scan_data.target_url,
        scan_type=scan_data.scan_type,
        status=ScanStatus.PENDING
    )
    db.add(db_scan)
    db.commit()
    db.refresh(db_scan)
    return db_scan


async def execute_scan(db: Session, scan_id: int) -> Scan:
    """Execute the security scan and store results"""
    # Get the scan
    scan = db.query(Scan).filter(Scan.id == scan_id).first()
    if not scan:
        raise ValueError("Scan not found")

    # Update status to running
    scan.status = ScanStatus.RUNNING
    db.commit()

    try:
        # Perform the scan
        scanner = SecurityScanner(scan.target_url)
        findings = await scanner.perform_scan(scan.scan_type.value)

        # Save vulnerabilities
        for finding in findings:
            vulnerability = Vulnerability(
                scan_id=scan.id,
                severity=finding['severity'],
                title=finding['title'],
                description=finding['description'],
                recommendation=finding['recommendation']
            )
            db.add(vulnerability)

        # Update scan status to completed
        scan.status = ScanStatus.COMPLETED
        scan.completed_at = datetime.now()
        db.commit()
        db.refresh(scan)

    except Exception as e:
        # Update scan status to failed
        scan.status = ScanStatus.FAILED
        scan.completed_at = datetime.now()
        db.commit()

        # Add error as vulnerability
        error_vuln = Vulnerability(
            scan_id=scan.id,
            severity="high",
            title="Scan execution error",
            description=f"An error occurred during scan: {str(e)}",
            recommendation="Contact support if this persists"
        )
        db.add(error_vuln)
        db.commit()

        raise

    return scan


def get_scan(db: Session, scan_id: int, user_id: int) -> Optional[Scan]:
    """Get a scan by ID (only if owned by user)"""
    return db.query(Scan).filter(
        Scan.id == scan_id,
        Scan.user_id == user_id
    ).first()


def get_user_scans(
    db: Session,
    user_id: int,
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = None
) -> List[Scan]:
    """Get all scans for a user with pagination"""
    query = db.query(Scan).filter(Scan.user_id == user_id)

    if status:
        query = query.filter(Scan.status == status)

    return query.order_by(Scan.created_at.desc()).offset(skip).limit(limit).all()


def delete_scan(db: Session, scan_id: int, user_id: int) -> bool:
    """Delete a scan (only if owned by user)"""
    scan = db.query(Scan).filter(
        Scan.id == scan_id,
        Scan.user_id == user_id
    ).first()

    if not scan:
        return False

    db.delete(scan)
    db.commit()
    return True


def update_scan_status(db: Session, scan_id: int, status: ScanStatus) -> Optional[Scan]:
    """Update scan status"""
    scan = db.query(Scan).filter(Scan.id == scan_id).first()
    if not scan:
        return None

    scan.status = status
    if status == ScanStatus.COMPLETED or status == ScanStatus.FAILED:
        scan.completed_at = datetime.now()

    db.commit()
    db.refresh(scan)
    return scan
