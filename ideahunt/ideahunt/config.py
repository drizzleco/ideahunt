import os


class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL",
        "postgresql://admin:password@postgres:5432/ideahunt",  # dev server
    )
    REDIS_URL = os.environ.get("REDIS_URL", "redis://redis:6379/0")
    SECRET_KEY = os.environ.get("SECRET_KEY", "dummy")
    JWT_SECRET_KEY = os.environ.geT("JWT_SECRET_KEY", "dummyo")
