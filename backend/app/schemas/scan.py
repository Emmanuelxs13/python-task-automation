"""
Scan schemas for request/response validation
"""

from app.schemas.vulnerability import VulnerabilityResponse
from pydantic import BaseModel, HttpUrl, Field, field_validator
from datetime import datetime
from typing import Optional, List
from enum import Enum


class ScanTypeEnum(str, Enum):
    """Scan type options"""
    BASIC = "basic"
    HEADERS = "headers"
    SSL = "ssl"
    FULL = "full"


class ScanStatusEnum(str, Enum):
    """Scan status options"""
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"


class ScanCreate(BaseModel):
    """Schema for creating a new scan"""
    target_url: str = Field(..., description="URL or domain to scan",
                            min_length=3, max_length=500)
    scan_type: ScanTypeEnum = Field(
        default=ScanTypeEnum.BASIC, description="Type of scan to perform")

    @field_validator('target_url')
    @classmethod
    def validate_url(cls, v: str) -> str:
        """Validate and normalize URL"""
        v = v.strip()
        if not v.startswith(('http://', 'https://')):
            v = f'https://{v}'
        return v


class ScanUpdate(BaseModel):
    """Schema for updating scan status"""
    status: Optional[ScanStatusEnum] = None
    completed_at: Optional[datetime] = None


class ScanBase(BaseModel):
    """Base scan schema"""
    id: int
    user_id: int
    target_url: str
    scan_type: ScanTypeEnum
    status: ScanStatusEnum
    created_at: datetime
    completed_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ScanResponse(ScanBase):
    """Schema for scan response with vulnerabilities"""
    vulnerabilities: List["VulnerabilityResponse"] = []

    class Config:
        from_attributes = True


class ScanListResponse(ScanBase):
    """Schema for scan list response (without vulnerabilities)"""
    vulnerability_count: int = 0

    class Config:
        from_attributes = True


# Import for type hinting
ScanResponse.model_rebuild()
