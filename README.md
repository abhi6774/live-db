# Community - Connection

This project is a real-time communication and data management framework, primarily designed for use with MongoDB. It provides a robust foundation for building applications that require real-time data synchronization and event-driven communication.

## Features

- Real-time communication using Socket.IO
- MongoDB integration for data persistence
- Express.js server for RESTful API endpoints
- Prisma ORM for database operations
- Modular architecture for easy extensibility
- Application and startup management
- Middleware for application verification
- Namespace-based Socket.IO communication
- TypeScript support for improved type safety

## Project Structure

The project is organized into several key directories:

- `src/`: Contains the main application code
  - `database/`: Database initialization and connection management
  - `middlewares/`: Express and Socket.IO middlewares
  - `nsps/`: Socket.IO namespace configurations
  - `routers/`: Express route definitions
  - `services/`: Business logic and data management services
  - `utils/`: Utility functions and helper classes
- `prisma/`: Prisma ORM schema and configurations
- `testing/`: Test scripts and utilities

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your environment variables in a `.env` file
4. Run the development server: `npm run dev`

## API Endpoints

- `/application`: Manage registered applications
- `/startup`: Manage startup information

## Socket.IO Namespaces

The project uses dynamic Socket.IO namespaces for real-time communication. Clients can connect to namespaces based on collection names and document IDs.

## Development

- Build: `npm run build`
- Test: `npm test`
- Development server: `npm run dev`

## Technologies Used

- Node.js
- Express.js
- Socket.IO
- MongoDB
- Prisma ORM
- TypeScript

## Requirements

1. Node.js (version 14 or higher recommended)
2. MongoDB instance
3. Bun runtime (for development)

## Setup and Running

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL_ROOT=<your-mongodb-connection-string>
   MODE=DEVELOPMENT
   ```

4. Initialize Prisma:
   ```
   npx prisma generate
   ```

5. Build the project:
   ```
   npm run build
   ```

6. Run the development server:
   ```
   npm run dev
   ```

   This command will use nodemon to watch for changes, rebuild the project, and run it using Bun.

7. For production:
   ```
   npm run build
   node dist/main.js
   ```

## Notes

- Ensure MongoDB is running and accessible via the connection string provided in the `.env` file.
- The development script uses Bun, so make sure it's installed on your system.
- The project runs on port 3000 by default. You can change this in the `src/main.ts` file if needed.

This project provides a solid foundation for building scalable, real-time applications with a focus on data synchronization and event-driven architecture.
