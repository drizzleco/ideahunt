### lint_frontend -- eslint, prettier
.PHONY: lint_frontend
lint_frontend:
	cd client; yarn lint

### lint_backend -- black, isort
.PHONY: lint_backend
lint_backend:
	cd ideahunt; poetry shell; poetry run isort ideahunt; poetry run black ideahunt; poetry run mypy ideahunt
