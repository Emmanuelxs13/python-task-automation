"""
Tests for scan endpoints
"""

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.main import app
from app.models.user import User
from app.models.scan import Scan


def test_create_scan(client: TestClient, test_user_token: str):
    """Test creating a new scan"""
    response = client.post(
        "/api/v1/scans/",
        headers={"Authorization": f"Bearer {test_user_token}"},
        json={
            "target_url": "https://example.com",
            "scan_type": "basic"
        }
    )
    assert response.status_code == 201
    data = response.json()
    assert data["target_url"] == "https://example.com"
    assert data["scan_type"] == "basic"
    assert data["status"] in ["pending", "running"]


def test_create_scan_without_auth(client: TestClient):
    """Test creating a scan without authentication"""
    response = client.post(
        "/api/v1/scans/",
        json={
            "target_url": "https://example.com",
            "scan_type": "basic"
        }
    )
    assert response.status_code == 403


def test_list_scans(client: TestClient, test_user_token: str, test_db: Session):
    """Test listing user scans"""
    response = client.get(
        "/api/v1/scans/",
        headers={"Authorization": f"Bearer {test_user_token}"}
    )
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_scan_detail(client: TestClient, test_user_token: str, test_db: Session, test_user: User):
    """Test getting scan details"""
    # Create a scan first
    from app.models.scan import Scan, ScanStatus, ScanType
    scan = Scan(
        user_id=test_user.id,
        target_url="https://test.com",
        scan_type=ScanType.BASIC,
        status=ScanStatus.COMPLETED
    )
    test_db.add(scan)
    test_db.commit()
    test_db.refresh(scan)

    response = client.get(
        f"/api/v1/scans/{scan.id}",
        headers={"Authorization": f"Bearer {test_user_token}"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == scan.id
    assert data["target_url"] == "https://test.com"


def test_get_scan_not_owned(client: TestClient, test_user_token: str, test_db: Session):
    """Test getting a scan not owned by user"""
    # Create a scan for another user
    from app.models.scan import Scan, ScanStatus, ScanType
    from app.models.user import User

    other_user = User(
        email="other@test.com",
        full_name="Other User",
        hashed_password="hashed"
    )
    test_db.add(other_user)
    test_db.commit()

    scan = Scan(
        user_id=other_user.id,
        target_url="https://test.com",
        scan_type=ScanType.BASIC,
        status=ScanStatus.COMPLETED
    )
    test_db.add(scan)
    test_db.commit()
    test_db.refresh(scan)

    response = client.get(
        f"/api/v1/scans/{scan.id}",
        headers={"Authorization": f"Bearer {test_user_token}"}
    )
    assert response.status_code == 404


def test_delete_scan(client: TestClient, test_user_token: str, test_db: Session, test_user: User):
    """Test deleting a scan"""
    # Create a scan first
    from app.models.scan import Scan, ScanStatus, ScanType
    scan = Scan(
        user_id=test_user.id,
        target_url="https://test.com",
        scan_type=ScanType.BASIC,
        status=ScanStatus.COMPLETED
    )
    test_db.add(scan)
    test_db.commit()
    test_db.refresh(scan)

    response = client.delete(
        f"/api/v1/scans/{scan.id}",
        headers={"Authorization": f"Bearer {test_user_token}"}
    )
    assert response.status_code == 204

    # Verify scan is deleted
    deleted_scan = test_db.query(Scan).filter(Scan.id == scan.id).first()
    assert deleted_scan is None
