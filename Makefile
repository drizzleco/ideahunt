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
	cd ideahunt; poetry run isort ideahunt; poetry run black ideahunt;

### mypy -- mypy ideahunt
mypy:
	cd ideahunt; poetry run mypy ideahunt

### heroku_deploy -- one step heroku deploy
.PHONY: heroku_deploy
heroku_deploy:
	cd ideahunt; heroku container:push web --app drizzle-ideahunt; heroku container:release web --app drizzle-ideahunt

### run_dev_server -- one step dev server w. dev config
.PHONY: dev_server
dev_server:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up webserver
