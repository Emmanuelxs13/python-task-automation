"""
Database initialization script
Creates all tables and optionally seeds initial data
"""

from app.core.database import engine, Base
from app.models.user import User


def init_db():
    """Create all database tables"""
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully!")


if __name__ == "__main__":
    init_db()
