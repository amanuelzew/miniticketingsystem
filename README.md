# Mini Ticketing System

This is a simple ticketing system. It allows users to create, view, and manage tickets for various issues or requests.

## Features

-   user managment(signup,login)
-   profile managment
-   Create new tickets with a title, description, and status.
-   Filter tickets based on various criteria by status.
-   Update existing tickets Status.(ADMIN)

## Tech Stack

- [Node.js](https://nodejs.org/) for runtime environment
- [Express](https://expressjs.com/) for server-side logic
- [MongoDB](https://www.mongodb.com/) for database
- [React](https://reactjs.org/) for front-end
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) for styling

### Prerequisites

- Node.js 20+ and npm/yarn
- Mongodb database

### Installation

1. Cloning the repository.
2. Installing dependencies.
3. Configuring the database.
4. Setting up environment variables.
5. Starting the development server.

## Project Structure


### `backend` - Server-side logic
- `cofig` - database configuration
- `controllers` - Controller functions
- `middleware` - Middleware functions
- `models` - Database models
- `routes` - Route definitions
- `utils` - Utility functions
- `server.js` - Server entry point

### `frontend` - Client-side logic
- `src/pages` - React pages
- `src/components` - Reusable UI components
- `src/util` - Utility functions and libraries
- `src/slices` - Redux slices

