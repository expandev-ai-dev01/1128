# TODO List Backend API

Backend REST API for TODO List system built with Node.js, Express, TypeScript, and SQL Server.

## Features

- RESTful API architecture
- TypeScript for type safety
- SQL Server database integration
- Multi-tenancy support
- Request validation with Zod
- Comprehensive error handling
- API versioning

## Prerequisites

- Node.js 18.x or higher
- SQL Server 2019 or higher
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and configure your environment variables
4. Run database migrations (instructions to be added)

## Development

Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000/api/v1`

## Build

Build for production:
```bash
npm run build
```

## Start Production

Start the production server:
```bash
npm start
```

## Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## API Documentation

### Health Check
- **GET** `/health` - Check API health status

### API Endpoints
All API endpoints are prefixed with `/api/v1`

#### External Routes (Public)
- Available at `/api/v1/external/`

#### Internal Routes (Authenticated)
- Available at `/api/v1/internal/`

## Project Structure

```
src/
├── api/                    # API controllers
│   └── v1/                 # API version 1
│       ├── external/       # Public endpoints
│       └── internal/       # Authenticated endpoints
├── routes/                 # Route definitions
│   ├── v1/                 # Version 1 routes
│   └── index.ts            # Main router
├── middleware/             # Express middleware
├── services/               # Business logic
├── utils/                  # Utility functions
├── constants/              # Application constants
├── instances/              # Service instances
├── tests/                  # Global test utilities
└── server.ts               # Application entry point
```

## Environment Variables

See `.env.example` for all available configuration options.

## License

ISC