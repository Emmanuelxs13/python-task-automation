"""
Scan endpoints
Handles scan creation, retrieval, and management
"""

from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List, Optional

from app.core.database import get_db
from app.models.user import User
from app.schemas.scan import ScanCreate, ScanResponse, ScanListResponse
from app.services import scan_service
from app.security.deps import get_current_user

router = APIRouter()


@router.post("/", response_model=ScanResponse, status_code=status.HTTP_201_CREATED)
async def create_scan(
    scan_data: ScanCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create a new security scan

    - **target_url**: URL or domain to scan
    - **scan_type**: Type of scan (basic, headers, ssl, full)

    The scan will be executed in the background
    """
    try:
        # Create the scan
        scan = await scan_service.create_scan(db, scan_data, current_user.id)

        # Execute scan in background
        background_tasks.add_task(scan_service.execute_scan, db, scan.id)

        return scan

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating scan: {str(e)}"
        )


@router.get("/", response_model=List[ScanListResponse])
async def list_scans(
    skip: int = 0,
    limit: int = 100,
    status_filter: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get all scans for the current user

    - **skip**: Number of records to skip (pagination)
    - **limit**: Maximum number of records to return
    - **status**: Filter by status (pending, running, completed, failed)
    """
    scans = scan_service.get_user_scans(
        db,
        current_user.id,
        skip=skip,
        limit=limit,
        status=status_filter
    )

    # Add vulnerability count to each scan
    result = []
    for scan in scans:
        scan_dict = ScanListResponse.model_validate(scan)
        scan_dict.vulnerability_count = len(scan.vulnerabilities)
        result.append(scan_dict)

    return result


@router.get("/{scan_id}", response_model=ScanResponse)
async def get_scan(
    scan_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get detailed information about a specific scan

    Includes all vulnerabilities found
    """
    scan = scan_service.get_scan(db, scan_id, current_user.id)

    if not scan:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Scan not found or you don't have permission to access it"
        )

    return scan


@router.delete("/{scan_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_scan(
    scan_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Delete a scan and all its vulnerabilities
    """
    deleted = scan_service.delete_scan(db, scan_id, current_user.id)

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Scan not found or you don't have permission to delete it"
        )

    return None
