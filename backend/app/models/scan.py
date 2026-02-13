"""
Scan model for security scanning
Stores information about security scans performed by users
"""

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum

from app.core.database import Base


class ScanStatus(str, enum.Enum):
    """Scan status enumeration"""
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"


class ScanType(str, enum.Enum):
    """Scan type enumeration"""
    BASIC = "basic"
    HEADERS = "headers"
    SSL = "ssl"
    FULL = "full"


class Scan(Base):
    """
    Scan model representing a security scan

    Attributes:
        id: Unique scan identifier
        user_id: ID of the user who created the scan
        target_url: URL/domain to scan
        scan_type: Type of scan to perform
        status: Current status of the scan
        created_at: Timestamp when scan was created
        completed_at: Timestamp when scan finished
    """
    __tablename__ = "scans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey(
        "users.id", ondelete="CASCADE"), nullable=False)
    target_url = Column(String(500), nullable=False)
    scan_type = Column(SQLEnum(ScanType),
                       default=ScanType.BASIC, nullable=False)
    status = Column(SQLEnum(ScanStatus),
                    default=ScanStatus.PENDING, nullable=False)
    created_at = Column(DateTime(timezone=True),
                        server_default=func.now(), nullable=False)
    completed_at = Column(DateTime(timezone=True), nullable=True)

    # Relationships
    user = relationship("User", back_populates="scans")
    vulnerabilities = relationship(
        "Vulnerability", back_populates="scan", cascade="all, delete-orphan")
