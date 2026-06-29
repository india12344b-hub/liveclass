# AI Tutor Full-Stack Starter

This workspace contains a production-style starter application with:

- A Node.js + Express backend with JWT authentication, validation, error handling, and logging
- A Vite + React frontend with a sign-in/sign-up experience and a dashboard view

## Project Structure

- backend/ - Express API server
- frontend/ - React application

## Prerequisites

- Node.js 20+
- npm 10+

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend runs on http://localhost:5000

Health check:

```bash
curl http://localhost:5000/health
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on http://localhost:5173

## Authentication Flow

The starter currently supports:

- Register
- Login
- Token-based session handling in the frontend

## Testing

Backend tests:

```bash
cd backend
npm test
```

## Notes

The backend uses an in-memory user store for the starter flow. It is designed to be extended with a real database later.
