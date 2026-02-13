"""
Tests for report and statistics endpoints
"""

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.models.user import User
from app.models.scan import Scan, ScanStatus, ScanType
from app.models.vulnerability import Vulnerability, Severity


def test_get_scan_report(client: TestClient, test_user_token: str, test_db: Session, test_user: User):
    """Test getting a scan report"""
    # Create a scan with vulnerabilities
    scan = Scan(
        user_id=test_user.id,
        target_url="https://test.com",
        scan_type=ScanType.FULL,
        status=ScanStatus.COMPLETED
    )
    test_db.add(scan)
    test_db.commit()
    test_db.refresh(scan)

    # Add vulnerabilities
    vuln1 = Vulnerability(
        scan_id=scan.id,
        severity=Severity.CRITICAL,
        title="Critical Issue",
        description="This is critical",
        recommendation="Fix immediately"
    )
    vuln2 = Vulnerability(
        scan_id=scan.id,
        severity=Severity.LOW,
        title="Minor Issue",
        description="This is minor",
        recommendation="Fix when possible"
    )
    test_db.add(vuln1)
    test_db.add(vuln2)
    test_db.commit()

    response = client.get(
        f"/api/v1/scans/{scan.id}/report",
        headers={"Authorization": f"Bearer {test_user_token}"}
    )

    assert response.status_code == 200
    data = response.json()
    assert "summary" in data
    assert "vulnerabilities" in data
    assert "recommendations" in data
    assert data["summary"]["total_vulnerabilities"] == 2
    assert data["summary"]["severity_breakdown"]["critical"] == 1
    assert data["summary"]["severity_breakdown"]["low"] == 1


def test_export_scan_json(client: TestClient, test_user_token: str, test_db: Session, test_user: User):
    """Test exporting scan as JSON"""
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
        f"/api/v1/scans/{scan.id}/export/json",
        headers={"Authorization": f"Bearer {test_user_token}"}
    )

    assert response.status_code == 200
    assert response.headers["content-type"] == "application/json"
    assert "attachment" in response.headers["content-disposition"]


def test_export_scan_csv(client: TestClient, test_user_token: str, test_db: Session, test_user: User):
    """Test exporting scan as CSV"""
    scan = Scan(
        user_id=test_user.id,
        target_url="https://test.com",
        scan_type=ScanType.BASIC,
        status=ScanStatus.COMPLETED
    )
    test_db.add(scan)
    test_db.commit()
    test_db.refresh(scan)

    # Add a vulnerability
    vuln = Vulnerability(
        scan_id=scan.id,
        severity=Severity.HIGH,
        title="Test Vulnerability",
        description="Test description",
        recommendation="Test recommendation"
    )
    test_db.add(vuln)
    test_db.commit()

    response = client.get(
        f"/api/v1/scans/{scan.id}/export/csv",
        headers={"Authorization": f"Bearer {test_user_token}"}
    )

    assert response.status_code == 200
    assert response.headers["content-type"] == "text/csv; charset=utf-8"
    assert "Severity,Title,Description" in response.text


def test_get_user_statistics(client: TestClient, test_user_token: str, test_db: Session, test_user: User):
    """Test getting user statistics"""
    # Create some scans
    scan1 = Scan(
        user_id=test_user.id,
        target_url="https://test1.com",
        scan_type=ScanType.BASIC,
        status=ScanStatus.COMPLETED
    )
    scan2 = Scan(
        user_id=test_user.id,
        target_url="https://test2.com",
        scan_type=ScanType.FULL,
        status=ScanStatus.PENDING
    )
    test_db.add(scan1)
    test_db.add(scan2)
    test_db.commit()

    response = client.get(
        "/api/v1/stats/user",
        headers={"Authorization": f"Bearer {test_user_token}"}
    )

    assert response.status_code == 200
    data = response.json()
    assert data["total_scans"] == 2
    assert data["completed_scans"] == 1
    assert data["pending_scans"] == 1


def test_get_site_history(client: TestClient, test_user_token: str, test_db: Session, test_user: User):
    """Test getting site scan history"""
    # Create multiple scans for the same domain
    scan1 = Scan(
        user_id=test_user.id,
        target_url="https://example.com",
        scan_type=ScanType.BASIC,
        status=ScanStatus.COMPLETED
    )
    scan2 = Scan(
        user_id=test_user.id,
        target_url="https://example.com/page",
        scan_type=ScanType.FULL,
        status=ScanStatus.COMPLETED
    )
    test_db.add(scan1)
    test_db.add(scan2)
    test_db.commit()

    response = client.get(
        "/api/v1/stats/site/example.com",
        headers={"Authorization": f"Bearer {test_user_token}"}
    )

    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 2


def test_report_not_found(client: TestClient, test_user_token: str):
    """Test getting report for non-existent scan"""
    response = client.get(
        "/api/v1/scans/99999/report",
        headers={"Authorization": f"Bearer {test_user_token}"}
    )

    assert response.status_code == 404
