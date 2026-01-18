# PERN Stack CRUD Application

A full-stack application built with PostgreSQL, Express, React, and Node.js featuring JWT authentication and CRUD operations.

## Project Structure

```
testing-clou/
├── backend/           # Express API server
│   ├── config/        # Database configuration
│   ├── controllers/   # Route handlers
│   ├── middleware/    # JWT authentication
│   ├── models/        # Sequelize models
│   ├── routes/        # API routes
│   └── server.js      # Entry point
│
├── frontend/          # React application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # Auth context
│   │   └── services/    # API service
│   └── vite.config.js
│
└── README.md
```

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Setup Instructions

### 1. Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE pern_crud;
```

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file from template
cp .env.example .env

# Edit .env with your database credentials
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=pern_crud
# DB_USER=postgres
# DB_PASSWORD=yourpassword
# JWT_SECRET=your-secret-key-change-in-production
# PORT=5000

# Start the server
npm run dev
```

The backend will run on http://localhost:5000

### 3. Frontend Setup

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on http://localhost:5173

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/auth/register | Register new user | No |
| POST | /api/auth/login | Login user | No |
| GET | /api/auth/me | Get current user | Yes |

### Items (CRUD)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /api/items | Get all user items | Yes |
| GET | /api/items/:id | Get single item | Yes |
| POST | /api/items | Create new item | Yes |
| PUT | /api/items/:id | Update item | Yes |
| DELETE | /api/items/:id | Delete item | Yes |

## Features

- User registration and authentication with JWT
- Protected routes on both frontend and backend
- Create, read, update, and delete items
- Responsive UI design
- Form validation
- Error handling

## Tech Stack

**Backend:**
- Express.js - Web framework
- Sequelize - ORM for PostgreSQL
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- cors - Cross-origin resource sharing

**Frontend:**
- React 18 - UI library
- React Router v6 - Client-side routing
- Axios - HTTP client
- Vite - Build tool

## Environment Variables

### Backend (.env)

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pern_crud
DB_USER=postgres
DB_PASSWORD=yourpassword
JWT_SECRET=your-secret-key-change-in-production
PORT=5000
```

## Development

To run both frontend and backend simultaneously, open two terminal windows:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

## Testing the API

You can test the API endpoints using curl or Postman:

```bash
# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Create an item (replace TOKEN with your JWT)
curl -X POST http://localhost:5000/api/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"My Item","description":"Item description"}'
```
