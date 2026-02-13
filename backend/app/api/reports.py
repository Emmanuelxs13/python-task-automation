"""
Report and statistics endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from typing import List
import json
import csv
from io import StringIO

from app.core.database import get_db
from app.models.user import User
from app.schemas.report import ReportResponse, UserStatistics, ScanSummary
from app.services.report_service import ReportGenerator, get_user_statistics, get_site_history
from app.services.scan_service import get_scan
from app.security.deps import get_current_user

router = APIRouter()


@router.get("/scans/{scan_id}/report", response_model=ReportResponse)
async def get_scan_report(
    scan_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get a complete report for a scan

    Returns summary, vulnerabilities, and recommendations
    """
    scan = get_scan(db, scan_id, current_user.id)

    if not scan:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Scan not found"
        )

    generator = ReportGenerator(scan)
    report = generator.generate_json_report()

    return report


@router.get("/scans/{scan_id}/export/json")
async def export_scan_json(
    scan_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Export scan report as JSON file
    """
    scan = get_scan(db, scan_id, current_user.id)

    if not scan:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Scan not found"
        )

    generator = ReportGenerator(scan)
    report = generator.generate_json_report()

    json_content = json.dumps(report, indent=2)

    return Response(
        content=json_content,
        media_type="application/json",
        headers={
            "Content-Disposition": f"attachment; filename=scan_{scan_id}_report.json"
        }
    )


@router.get("/scans/{scan_id}/export/csv")
async def export_scan_csv(
    scan_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Export scan vulnerabilities as CSV file
    """
    scan = get_scan(db, scan_id, current_user.id)

    if not scan:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Scan not found"
        )

    generator = ReportGenerator(scan)
    csv_data = generator.generate_csv_data()

    if not csv_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No vulnerabilities to export"
        )

    # Generate CSV
    output = StringIO()
    fieldnames = ['Severity', 'Title',
                  'Description', 'Recommendation', 'Detected']
    writer = csv.DictWriter(output, fieldnames=fieldnames)

    writer.writeheader()
    writer.writerows(csv_data)

    csv_content = output.getvalue()

    return Response(
        content=csv_content,
        media_type="text/csv",
        headers={
            "Content-Disposition": f"attachment; filename=scan_{scan_id}_vulnerabilities.csv"
        }
    )


@router.get("/stats/user", response_model=UserStatistics)
async def get_current_user_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get statistics for the current user

    Returns total scans, vulnerabilities, and other metrics
    """
    stats = get_user_statistics(db, current_user.id)
    return stats


@router.get("/stats/site/{domain}", response_model=List[ScanSummary])
async def get_domain_history(
    domain: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get scan history for a specific domain

    Returns all scans performed on this domain by the current user
    """
    history = get_site_history(db, current_user.id, domain)
    return history
