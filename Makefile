SERVICE = web

build :
	docker compose build

up:
	docker compose up -d

down:
	docker compose down

shell: up
	docker compose exec -it $(SERVICE) /bin/bash

format:
	npx prettier --write src/

lint:
	npm run lint

logs:
	docker compose logs -f $(SERVICE)


.PHONY: build up down shell