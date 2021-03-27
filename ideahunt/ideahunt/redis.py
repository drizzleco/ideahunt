from typing import Optional

from flask import _app_ctx_stack
from flask.app import Flask
from redis import Redis
from redis.client import PubSub


class IdeaHuntRedis:
    def __init__(self, app: Optional[Flask] = None):
        self.app = app
        if app is not None:
            self.init_app(app)

    def init_app(self, app: Flask) -> None:
        redis_url = app.config.get("REDIS_URL", "redis://localhost:6379/0")
        self.client = Redis.from_url(url=redis_url)
        app.teardown_appcontext(self.teardown)

    def teardown(self, exception) -> None:
        ctx = _app_ctx_stack.top
        if hasattr(ctx, "redis_pubsub"):
            ctx.redis_pubsub.close()

    @property
    def pubsub(self) -> PubSub:
        """ Cache the pubsub instance for the lifetime of the event """
        ctx = _app_ctx_stack.top
        if ctx is not None:
            if not hasattr(ctx, "redis_pubsub"):
                ctx.redis_pubsub = self.client.pubsub()
            return ctx.redis_pubsub
