"""
Report and statistics schemas
"""

from pydantic import BaseModel
from typing import Dict, List, Any
from datetime import datetime


class SeverityBreakdown(BaseModel):
    """Breakdown of vulnerabilities by severity"""
    critical: int = 0
    high: int = 0
    medium: int = 0
    low: int = 0
    info: int = 0


class ScanSummary(BaseModel):
    """Summary of a scan"""
    scan_id: int
    target_url: str
    scan_type: str
    status: str
    created_at: str
    completed_at: str | None
    total_vulnerabilities: int
    severity_breakdown: SeverityBreakdown
    security_score: int
    risk_level: str


class ReportResponse(BaseModel):
    """Complete report response"""
    report_generated_at: str
    summary: ScanSummary
    vulnerabilities: List[Dict[str, Any]]
    recommendations: List[str]


class UserStatistics(BaseModel):
    """User statistics response"""
    total_scans: int
    completed_scans: int
    pending_scans: int
    failed_scans: int
    total_vulnerabilities: int
    severity_breakdown: SeverityBreakdown
    most_scanned_domain: str | None
    most_scanned_count: int


class SiteHistory(BaseModel):
    """Site scan history"""
    domain: str
    scans: List[ScanSummary]
