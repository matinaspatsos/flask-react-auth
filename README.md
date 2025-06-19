# Test-Driven Development with Python, Flask, and Docker

[![pipeline status](https://gitlab.com/testdriven/flask-tdd-docker/badges/master/pipeline.svg)](https://gitlab.com/testdriven/flask-tdd-docker/commits/master)

https://testdriven.io/courses/tdd-flask/

## Getting Started

```sh
# Start app
docker compose up -d

# Get ID or full name of the "api" container (NOT "api-db")
docker ps
# Create and seed the db
docker exec -it API_CONTAINER_ID python manage.py recreate_db
docker exec -it API_CONTAINER_ID python manage.py seed_db

# Access DB
# Get the ID or full name of the "api-db" container
docker ps
docker exec -it DB_CONTAINER_ID psql -U postgres
\list
\c api_dev
\dt
select * from users;

# Run the tests
docker exec -it API_CONTAINER_ID python -m pytest "src/tests" -p no:warnings --cov="src"

# CI
# Lint
docker exec -it API_CONTAINER_ID flake8 src
# Format
docker exec -it API_CONTAINER_ID black src --check
# Sort dependencies
docker exec -it API_CONTAINER_ID isort src --check-only

# Bring down containers and volumes
docker compose down -v
```

### File Structure

This is the file structure of the app:

```
├── Dockerfile
├── Dockerfile.prod
├── README.md
├── docker-compose.yml
├── entrypoint.sh
├── manage.py
├── release.sh
├── requirements-dev.txt
├── requirements.txt
├── setup.cfg
└── src
    ├── __init__.py
    ├── api
    │   ├── __init__.py
    │   ├── ping.py
    │   └── users
    │       ├── __init__.py
    │       ├── admin.py
    │       ├── crud.py
    │       ├── models.py
    │       └── views.py
    ├── config.py
    ├── db
    │   ├── Dockerfile
    │   └── create.sql
    └── tests
        ├── __init__.py
        ├── conftest.py
        ├── pytest.ini
        ├── test_admin.py
        ├── test_config.py
        ├── test_ping.py
        ├── test_users.py
        └── test_users_unit.py
```

- _entrypoint.sh_ - Docker entrypoint. Waits for Postgres to be up before starting
- _manage.py_ - shell scripts for creating and seeding the database
- _release.sh_ - something to do with Heroku
- _setup.cfg_ - config file for CI
