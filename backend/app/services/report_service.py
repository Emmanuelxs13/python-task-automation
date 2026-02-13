"""
Report generation service
Creates PDF and JSON reports for security scans
"""

from datetime import datetime
from typing import Dict, Any, List
from sqlalchemy.orm import Session

from app.models.scan import Scan
from app.models.vulnerability import Vulnerability, Severity


class ReportGenerator:
    """Generate reports from scan data"""

    def __init__(self, scan: Scan):
        self.scan = scan

    def generate_summary(self) -> Dict[str, Any]:
        """Generate a summary of the scan results"""
        vulnerabilities = self.scan.vulnerabilities

        # Count by severity
        severity_counts = {
            'critical': 0,
            'high': 0,
            'medium': 0,
            'low': 0,
            'info': 0
        }

        for vuln in vulnerabilities:
            severity_counts[vuln.severity.value] += 1

        # Calculate security score (0-100)
        # Lower score = more/worse vulnerabilities
        total_vulns = len(vulnerabilities)
        critical_weight = severity_counts['critical'] * 10
        high_weight = severity_counts['high'] * 5
        medium_weight = severity_counts['medium'] * 2
        low_weight = severity_counts['low'] * 1

        total_weight = critical_weight + high_weight + medium_weight + low_weight
        score = max(0, 100 - total_weight)

        return {
            'scan_id': self.scan.id,
            'target_url': self.scan.target_url,
            'scan_type': self.scan.scan_type.value,
            'status': self.scan.status.value,
            'created_at': self.scan.created_at.isoformat(),
            'completed_at': self.scan.completed_at.isoformat() if self.scan.completed_at else None,
            'total_vulnerabilities': total_vulns,
            'severity_breakdown': severity_counts,
            'security_score': score,
            'risk_level': self._calculate_risk_level(score)
        }

    def _calculate_risk_level(self, score: int) -> str:
        """Calculate risk level based on score"""
        if score >= 80:
            return 'low'
        elif score >= 60:
            return 'medium'
        elif score >= 40:
            return 'high'
        else:
            return 'critical'

    def generate_json_report(self) -> Dict[str, Any]:
        """Generate complete JSON report"""
        summary = self.generate_summary()

        vulnerabilities = [
            {
                'id': v.id,
                'severity': v.severity.value,
                'title': v.title,
                'description': v.description,
                'recommendation': v.recommendation,
                'detected_at': v.created_at.isoformat()
            }
            for v in self.scan.vulnerabilities
        ]

        return {
            'report_generated_at': datetime.now().isoformat(),
            'summary': summary,
            'vulnerabilities': vulnerabilities,
            'recommendations': self._generate_recommendations()
        }

    def _generate_recommendations(self) -> List[str]:
        """Generate top recommendations based on vulnerabilities"""
        recommendations = []
        vulnerabilities = self.scan.vulnerabilities

        # Group by severity
        critical_vulns = [
            v for v in vulnerabilities if v.severity == Severity.CRITICAL]
        high_vulns = [
            v for v in vulnerabilities if v.severity == Severity.HIGH]

        if critical_vulns:
            recommendations.append(
                f"⚠️ URGENT: You have {len(critical_vulns)} critical vulnerabilities that need immediate attention.")

        if high_vulns:
            recommendations.append(
                f"⚠️ HIGH PRIORITY: Address {len(high_vulns)} high-severity issues as soon as possible.")

        # Add specific recommendations
        for vuln in critical_vulns[:3]:  # Top 3 critical
            if vuln.recommendation:
                recommendations.append(
                    f"• {vuln.title}: {vuln.recommendation}")

        return recommendations

    def generate_csv_data(self) -> List[Dict[str, Any]]:
        """Generate CSV-compatible data"""
        return [
            {
                'Severity': v.severity.value.upper(),
                'Title': v.title,
                'Description': v.description,
                'Recommendation': v.recommendation or 'N/A',
                'Detected': v.created_at.strftime('%Y-%m-%d %H:%M:%S')
            }
            for v in self.scan.vulnerabilities
        ]


def get_user_statistics(db: Session, user_id: int) -> Dict[str, Any]:
    """Get statistics for a user"""
    from app.models.scan import Scan, ScanStatus

    scans = db.query(Scan).filter(Scan.user_id == user_id).all()

    total_scans = len(scans)
    completed_scans = len(
        [s for s in scans if s.status == ScanStatus.COMPLETED])
    pending_scans = len([s for s in scans if s.status == ScanStatus.PENDING])
    failed_scans = len([s for s in scans if s.status == ScanStatus.FAILED])

    # Count all vulnerabilities
    all_vulnerabilities = []
    for scan in scans:
        all_vulnerabilities.extend(scan.vulnerabilities)

    severity_counts = {
        'critical': 0,
        'high': 0,
        'medium': 0,
        'low': 0,
        'info': 0
    }

    for vuln in all_vulnerabilities:
        severity_counts[vuln.severity.value] += 1

    # Most scanned domain
    domain_counts = {}
    for scan in scans:
        from urllib.parse import urlparse
        domain = urlparse(scan.target_url).netloc or scan.target_url
        domain_counts[domain] = domain_counts.get(domain, 0) + 1

    most_scanned = max(domain_counts.items(),
                       key=lambda x: x[1]) if domain_counts else (None, 0)

    return {
        'total_scans': total_scans,
        'completed_scans': completed_scans,
        'pending_scans': pending_scans,
        'failed_scans': failed_scans,
        'total_vulnerabilities': len(all_vulnerabilities),
        'severity_breakdown': severity_counts,
        'most_scanned_domain': most_scanned[0],
        'most_scanned_count': most_scanned[1]
    }


def get_site_history(db: Session, user_id: int, domain: str) -> List[Dict[str, Any]]:
    """Get scan history for a specific domain"""
    from app.models.scan import Scan
    from urllib.parse import urlparse

    scans = db.query(Scan).filter(Scan.user_id == user_id).all()

    # Filter scans for this domain
    domain_scans = []
    for scan in scans:
        scan_domain = urlparse(scan.target_url).netloc or scan.target_url
        if scan_domain == domain:
            generator = ReportGenerator(scan)
            summary = generator.generate_summary()
            domain_scans.append(summary)

    # Sort by date
    domain_scans.sort(key=lambda x: x['created_at'], reverse=True)

    return domain_scans
