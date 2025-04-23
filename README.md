# Pet Adoption Portal

A full-stack web application for pet adoption, featuring a React frontend and Django REST API backend.

## Project Overview

This project is a Pet Adoption portal that allows users to:
- Browse available pets for adoption
- Filter and search for pets by various criteria
- Register and login to the platform
- Add pets for adoption
- Manage their pet listings
- View detailed information about pets

## Project Structure

The project is divided into two main parts:

### Client (Frontend)

- React application built with Vite
- Bootstrap for styling
- React Router for navigation
- Axios for API communication

### API (Backend)

- Django REST Framework
- SQLite database for local development
- JWT authentication
- Dockerized for easy deployment

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Python 3.12+
- Pipenv
- Docker (optional, for running the API in a container)

### Running the Client

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

The client will be available at http://localhost:5173/

### Running the API

#### Option 1: Using Pipenv

1. Navigate to the API directory:
   ```
   cd api
   ```

2. Install dependencies:
   ```
   pipenv install
   ```

3. Activate the virtual environment:
   ```
   pipenv shell
   ```

4. Run migrations:
   ```
   python manage.py migrate
   ```

5. Start the development server:
   ```
   python manage.py runserver
   ```

The API will be available at http://localhost:8000/

#### Option 2: Using Docker

1. Navigate to the API directory:
   ```
   cd api
   ```

2. Build and start the Docker container:
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

## Future Enhancements

- AWS deployment
- Image upload for pets
- Advanced search and filtering
- Adoption application process
- Admin dashboard
- Email notifications