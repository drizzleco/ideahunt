from flask_sqlalchemy import BaseQuery, SQLAlchemy
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, scoped_session, sessionmaker
from sqlalchemy.schema import Index, PrimaryKeyConstraint
from sqlalchemy.sql import func
from werkzeug.security import check_password_hash, generate_password_hash

Base = declarative_base()

db = SQLAlchemy(model_class=Base)


class BaseModel(Base):
    __abstract__ = True
    query: BaseQuery
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())


class BaseManyModel(Base):
    """ In BaseManyModel, we don't need ids as primary keys """

    __abstract__ = True
    query: BaseQuery
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())


class Idea(BaseModel):
    __tablename__ = "idea"
    description = Column(String)
    title = Column(String)
    status = Column(String)
    version = Column(Integer)
    author_id = Column(Integer, ForeignKey("user.id"))

    author = relationship("User", back_populates="ideas")
    comments = relationship("Comment", back_populates="idea")
    likes = relationship("Like", back_populates="idea")


class Comment(BaseModel):
    __tablename__ = "comment"
    description = Column(String)

    author_id = Column(Integer, ForeignKey("user.id"))
    idea_id = Column(Integer, ForeignKey("idea.id"))

    author = relationship("User", back_populates="comments")
    idea = relationship("Idea", back_populates="comments")
    likes = relationship("Like", back_populates="comment")


class Like(BaseModel):
    __tablename__ = "like"
    author_id = Column(Integer, ForeignKey("user.id"))
    comment_id = Column(Integer, ForeignKey("comment.id"))
    idea_id = Column(Integer, ForeignKey("idea.id"))

    author = relationship("User", back_populates="likes")
    idea = relationship("Idea", back_populates="likes")
    comment = relationship("Comment", back_populates="likes")


class Follow(BaseManyModel):
    __tablename__ = "follow"

    user_id = Column(Integer, ForeignKey("user.id"))
    followee_id = Column(Integer, ForeignKey("user.id"))

    __table_args__ = (
        PrimaryKeyConstraint("user_id", "followee_id"),
        Index("followee_follower", "followee_id", "user_id"),
    )


class User(BaseModel):
    __tablename__ = "user"
    username = Column(String, unique=True)
    name = Column(String)
    email = Column(String, unique=True)
    password = Column(String)

    ideas = relationship("Idea", back_populates="author")
    comments = relationship("Comment", back_populates="author")
    likes = relationship("Like", back_populates="author")
    following = relationship(
        "User",
        "follow",
        primaryjoin=lambda: User.id == Follow.user_id,
        secondaryjoin=lambda: User.id == Follow.followee_id,
        backref="followers",
    )

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
