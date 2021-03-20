#!/usr/bin/env bash
set -euo pipefail

flask db upgrade
gunicorn --bind 0.0.0.0:$PORT api:app --worker-class gevent --workers 1
