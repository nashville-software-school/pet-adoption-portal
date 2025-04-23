# Pet Adoption API

This is a Django REST API for a Pet Adoption portal. It provides endpoints for user authentication and CRUD operations for pets.

## Features

- User authentication (register, login, logout)
- CRUD operations for pets
- Filtering and searching for pets
- API documentation

## Requirements

- Python 3.12+
- Pipenv

## Local Development

1. Install dependencies:
   ```
   pipenv install
   ```

2. Activate the virtual environment:
   ```
   pipenv shell
   ```

3. Run migrations:
   ```
   python manage.py migrate
   ```

4. Create a superuser (optional):
   ```
   python manage.py createsuperuser
   ```

5. Run the development server:
   ```
   python manage.py runserver
   ```

The API will be available at http://localhost:8000/

## Using Docker

1. Build and run the Docker container:
   ```
   docker-compose up
   ```

The API will be available at http://localhost:8000/

## API Endpoints

- `/api/pets/` - List and create pets
- `/api/pets/<id>/` - Retrieve, update, and delete a pet
- `/api/pets/available/` - List available pets
- `/api/pets/my_pets/` - List pets owned by the current user
- `/api/auth/register/` - Register a new user
- `/api/auth/login/` - Login
- `/api/auth/logout/` - Logout
- `/api/auth/me/` - Get and update current user details
- `/docs/` - API documentation