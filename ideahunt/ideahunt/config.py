import os


class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL",
        "postgresql://admin:password@postgres:5432/ideahunt",  # dev server
    )
    SECRET_KEY = "dummy"
    JWT_SECRET_KEY = "dummyo"
