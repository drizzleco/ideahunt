### help - Help docs for this Makefile
.PHONY: help
help :
	@sed -n '/^###/p' Makefile

### lint_frontend -- eslint, prettier
.PHONY: lint_frontend
lint_frontend:
	cd client; yarn lint

### lint_backend -- black, isort
.PHONY: lint_backend
lint_backend:
	cd ideahunt; poetry shell; poetry run isort ideahunt; poetry run black ideahunt; poetry run mypy ideahunt

### heroku_deploy -- one step heroku deploy
.PHONY: heroku_deploy
heroku_deploy:
	cd ideahunt; heroku container:push web --app drizzle-ideahunt; heroku container:release web --app drizzle-ideahunt