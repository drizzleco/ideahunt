#!/usr/bin/env bash
set -euo pipefail

flask db upgrade
gunicorn --bind 0.0.0.0:$PORT api:app --worker-class flask_sockets.worker --workers 4 --threads 0
