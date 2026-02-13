"""
Security scanning service
Performs various security checks on target URLs
"""

import httpx
import ssl
import socket
from urllib.parse import urlparse
from typing import List, Dict, Any
from datetime import datetime

from app.schemas.vulnerability import VulnerabilityCreate, SeverityEnum


class SecurityScanner:
    """Main security scanner class"""

    def __init__(self, target_url: str):
        self.target_url = target_url
        self.parsed_url = urlparse(target_url)
        self.vulnerabilities: List[VulnerabilityCreate] = []

    async def scan_https(self) -> List[Dict[str, Any]]:
        """Check if the site uses HTTPS"""
        findings = []

        if self.parsed_url.scheme != 'https':
            findings.append({
                'severity': SeverityEnum.HIGH,
                'title': 'Site not using HTTPS',
                'description': f'The site {self.target_url} is not using HTTPS protocol. All data transmitted is unencrypted and vulnerable to interception.',
                'recommendation': 'Implement HTTPS using a valid SSL/TLS certificate. Consider using Let\'s Encrypt for free certificates.'
            })
        else:
            findings.append({
                'severity': SeverityEnum.INFO,
                'title': 'HTTPS enabled',
                'description': 'The site is using HTTPS protocol.',
                'recommendation': None
            })

        return findings

    async def scan_headers(self) -> List[Dict[str, Any]]:
        """Check security headers"""
        findings = []

        try:
            async with httpx.AsyncClient(timeout=10.0, follow_redirects=True) as client:
                response = await client.get(self.target_url)
                headers = response.headers

                # Check for security headers
                security_headers = {
                    'Strict-Transport-Security': {
                        'severity': SeverityEnum.MEDIUM,
                        'title': 'Missing HSTS header',
                        'description': 'The Strict-Transport-Security header is not set. This header forces browsers to use HTTPS.',
                        'recommendation': 'Add the header: Strict-Transport-Security: max-age=31536000; includeSubDomains'
                    },
                    'X-Content-Type-Options': {
                        'severity': SeverityEnum.LOW,
                        'title': 'Missing X-Content-Type-Options header',
                        'description': 'This header prevents MIME-sniffing attacks.',
                        'recommendation': 'Add the header: X-Content-Type-Options: nosniff'
                    },
                    'X-Frame-Options': {
                        'severity': SeverityEnum.MEDIUM,
                        'title': 'Missing X-Frame-Options header',
                        'description': 'This header prevents clickjacking attacks by controlling if the site can be framed.',
                        'recommendation': 'Add the header: X-Frame-Options: DENY or SAMEORIGIN'
                    },
                    'Content-Security-Policy': {
                        'severity': SeverityEnum.MEDIUM,
                        'title': 'Missing Content-Security-Policy header',
                        'description': 'CSP helps prevent XSS and other code injection attacks.',
                        'recommendation': 'Implement a Content-Security-Policy appropriate for your site'
                    },
                    'X-XSS-Protection': {
                        'severity': SeverityEnum.LOW,
                        'title': 'Missing X-XSS-Protection header',
                        'description': 'This header enables the browser\'s XSS filter.',
                        'recommendation': 'Add the header: X-XSS-Protection: 1; mode=block'
                    }
                }

                for header, info in security_headers.items():
                    if header not in headers:
                        findings.append(info)
                    else:
                        findings.append({
                            'severity': SeverityEnum.INFO,
                            'title': f'{header} header present',
                            'description': f'The {header} security header is configured.',
                            'recommendation': None
                        })

                # Check for information disclosure
                server_header = headers.get('Server', '')
                if server_header and len(server_header) > 0:
                    findings.append({
                        'severity': SeverityEnum.LOW,
                        'title': 'Server information disclosure',
                        'description': f'The Server header reveals: {server_header}. This can help attackers identify vulnerabilities.',
                        'recommendation': 'Remove or minimize the Server header information.'
                    })

                # Check cookies
                set_cookie = headers.get('Set-Cookie', '')
                if set_cookie:
                    if 'Secure' not in set_cookie:
                        findings.append({
                            'severity': SeverityEnum.MEDIUM,
                            'title': 'Cookie without Secure flag',
                            'description': 'Cookies are set without the Secure flag, allowing transmission over HTTP.',
                            'recommendation': 'Add the Secure flag to all cookies: Set-Cookie: name=value; Secure'
                        })
                    if 'HttpOnly' not in set_cookie:
                        findings.append({
                            'severity': SeverityEnum.MEDIUM,
                            'title': 'Cookie without HttpOnly flag',
                            'description': 'Cookies are accessible via JavaScript, increasing XSS risk.',
                            'recommendation': 'Add the HttpOnly flag: Set-Cookie: name=value; HttpOnly'
                        })

        except httpx.RequestError as e:
            findings.append({
                'severity': SeverityEnum.HIGH,
                'title': 'Unable to connect to target',
                'description': f'Failed to connect to {self.target_url}: {str(e)}',
                'recommendation': 'Verify the URL is correct and the server is accessible.'
            })
        except Exception as e:
            findings.append({
                'severity': SeverityEnum.MEDIUM,
                'title': 'Error during header scan',
                'description': f'An error occurred: {str(e)}',
                'recommendation': 'Check the target URL and try again.'
            })

        return findings

    async def scan_ssl(self) -> List[Dict[str, Any]]:
        """Check SSL/TLS certificate"""
        findings = []

        if self.parsed_url.scheme != 'https':
            return findings  # Skip if not HTTPS

        try:
            hostname = self.parsed_url.hostname
            port = self.parsed_url.port or 443

            context = ssl.create_default_context()

            with socket.create_connection((hostname, port), timeout=10) as sock:
                with context.wrap_socket(sock, server_hostname=hostname) as ssock:
                    cert = ssock.getpeercert()

                    # Check certificate expiration
                    not_after = datetime.strptime(
                        cert['notAfter'], '%b %d %H:%M:%S %Y %Z')
                    days_until_expiry = (not_after - datetime.now()).days

                    if days_until_expiry < 0:
                        findings.append({
                            'severity': SeverityEnum.CRITICAL,
                            'title': 'SSL certificate expired',
                            'description': f'The SSL certificate expired {abs(days_until_expiry)} days ago.',
                            'recommendation': 'Renew the SSL certificate immediately.'
                        })
                    elif days_until_expiry < 30:
                        findings.append({
                            'severity': SeverityEnum.MEDIUM,
                            'title': 'SSL certificate expiring soon',
                            'description': f'The SSL certificate will expire in {days_until_expiry} days.',
                            'recommendation': 'Renew the SSL certificate before it expires.'
                        })
                    else:
                        findings.append({
                            'severity': SeverityEnum.INFO,
                            'title': 'Valid SSL certificate',
                            'description': f'SSL certificate is valid for {days_until_expiry} more days.',
                            'recommendation': None
                        })

                    # Check protocol version
                    version = ssock.version()
                    if version in ['TLSv1', 'TLSv1.1', 'SSLv2', 'SSLv3']:
                        findings.append({
                            'severity': SeverityEnum.HIGH,
                            'title': 'Outdated SSL/TLS protocol',
                            'description': f'The server supports {version} which has known vulnerabilities.',
                            'recommendation': 'Disable old protocols and use TLS 1.2 or higher.'
                        })
                    else:
                        findings.append({
                            'severity': SeverityEnum.INFO,
                            'title': f'Using {version}',
                            'description': f'The connection uses {version} protocol.',
                            'recommendation': None
                        })

        except ssl.SSLError as e:
            findings.append({
                'severity': SeverityEnum.CRITICAL,
                'title': 'SSL/TLS error',
                'description': f'SSL/TLS error: {str(e)}',
                'recommendation': 'Check the SSL certificate configuration.'
            })
        except socket.gaierror:
            findings.append({
                'severity': SeverityEnum.HIGH,
                'title': 'Unable to resolve hostname',
                'description': f'Could not resolve hostname: {self.parsed_url.hostname}',
                'recommendation': 'Verify the domain name is correct and DNS is configured.'
            })
        except Exception as e:
            findings.append({
                'severity': SeverityEnum.MEDIUM,
                'title': 'Error during SSL scan',
                'description': f'An error occurred: {str(e)}',
                'recommendation': 'Check the target URL and try again.'
            })

        return findings

    async def perform_scan(self, scan_type: str) -> List[Dict[str, Any]]:
        """Perform the complete scan based on type"""
        all_findings = []

        if scan_type in ['basic', 'full']:
            all_findings.extend(await self.scan_https())

        if scan_type in ['headers', 'full']:
            all_findings.extend(await self.scan_headers())

        if scan_type in ['ssl', 'full']:
            all_findings.extend(await self.scan_ssl())

        return all_findings
