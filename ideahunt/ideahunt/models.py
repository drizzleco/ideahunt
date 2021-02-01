from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from werkzeug.security import check_password_hash, generate_password_hash

Base = declarative_base()

db = SQLAlchemy(model_class=Base)


class BaseModel(Base):
    __abstract__ = True
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())


class Idea(BaseModel):
    __tablename__ = "idea"
    description = Column(String)
    title = Column(String)
    status = Column(String)
    version = Column(Integer)
    author_id = Column(Integer, ForeignKey('user.id'))

    author = relationship("User", back_populates="ideas")


class User(BaseModel):
    __tablename__ = "user"
    username = Column(String, unique=True)
    name = Column(String)
    email = Column(String, unique=True)
    password = Column(String)

    ideas = relationship("Idea", back_populates="author")

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
