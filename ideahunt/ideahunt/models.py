from flask_login import UserMixin
from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from werkzeug.security import check_password_hash, generate_password_hash

Base = declarative_base()


class BaseModel(Base):
    __abstract__ = True
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)


class Idea(BaseModel):
    __tablename__ = "idea"
    description = Column(String)
    title = Column(String)
    status = Column(String)
    version = Column(Integer)

    author_id = Column(Integer)


class User(BaseModel, UserMixin):
    __tablename__ = "user"
    username = Column(String)
    name = Column(String)
    email = Column(String)
    password = Column(String)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
