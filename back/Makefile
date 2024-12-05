.PHONY:up, down

up:
	docker compose -f ./storage/docker-compose.yml up -d
	go run .

down:
	docker compose -f ./storage/docker-compose.yml down
