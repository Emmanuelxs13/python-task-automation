"""
User Schemas
Pydantic models for user data validation and serialization
"""

from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


class UserBase(BaseModel):
    """Base user schema with common attributes"""
    email: EmailStr
    full_name: Optional[str] = None


class UserCreate(UserBase):
    """Schema for user registration"""
    password: str = Field(..., min_length=8,
                          description="Password must be at least 8 characters")


class UserUpdate(BaseModel):
    """Schema for user update"""
    full_name: Optional[str] = None
    password: Optional[str] = Field(None, min_length=8)


class UserInDB(UserBase):
    """Schema for user in database (includes all fields)"""
    id: int
    is_active: bool
    is_superuser: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class UserResponse(UserBase):
    """Schema for user response (public data only)"""
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True
