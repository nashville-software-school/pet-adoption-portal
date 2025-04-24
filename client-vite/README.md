# Pet Adoption Portal - Client

This is the frontend React application for the Pet Adoption Portal. It provides a user interface for browsing, adding, and managing pets for adoption.

## Features

- User authentication (register, login, logout)
- Browse available pets
- Filter and search for pets
- View detailed pet information
- Add, edit, and delete pets (for authenticated users)
- User profile management

## Technologies Used

- React
- React Router for navigation
- Axios for API requests
- Bootstrap for styling
- Vite as the build tool

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

The application will be available at http://localhost:5173/

## Project Structure

- `src/components/` - Reusable UI components
- `src/pages/` - Page components for different routes
- `src/context/` - React context for state management
- `src/services/` - API service functions

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run lint` - Run ESLint to check for code issues
- `npm run preview` - Preview the production build locally

## API Integration

This frontend application communicates with the Django REST API. Make sure the API server is running at http://localhost:8000/ for the application to function properly.

## Deployment

To build the application for production:

```
npm run build
```

This will create a `dist` directory with the compiled assets that can be deployed to any static hosting service.
