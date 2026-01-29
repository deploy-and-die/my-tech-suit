SHELL := /bin/bash
.ONESHELL:

IMAGE ?= my-tech-suit
COMPOSE ?= docker compose

.PHONY: help install dev build start lint prisma-generate prisma-migrate docker-build docker-up docker-down docker-logs

help:
	@echo "Available targets:"
	@echo "  install          Install node_modules via npm install"
	@echo "  dev              Run Next.js dev server"
	@echo "  build            Build the Next.js app"
	@echo "  start            Start the production server"
	@echo "  lint             Run ESLint"
	@echo "  prisma-generate  Generate Prisma client"
	@echo "  prisma-migrate   Apply Prisma migrations in dev"
	@echo "  docker-build     Build the production image"
	@echo "  docker-up        Start app + Postgres via docker compose"
	@echo "  docker-down      Stop the compose stack"
	@echo "  docker-logs      Tail logs from the compose stack"

install:
	npm install

test: lint

dev:
	npm run dev

build:
	npm run build

start:
	npm run start

lint:
	npm run lint

prisma-generate:
	npm run prisma:generate

prisma-migrate:
	npm run prisma:migrate

docker-build:
	docker build -t $(IMAGE) .

docker-up:
	$(COMPOSE) up --build

docker-down:
	$(COMPOSE) down

docker-logs:
	$(COMPOSE) logs -f
