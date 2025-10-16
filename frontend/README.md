# TODO List Application

## Overview
A modern task management application built with React, TypeScript, and TailwindCSS.

## Features
- Task creation with title, description, due date, and priority levels
- Modern and responsive UI
- Type-safe development with TypeScript
- Efficient state management with TanStack Query
- Form handling with React Hook Form and Zod validation

## Tech Stack
- **Frontend Framework**: React 18.3.1
- **Language**: TypeScript 5.6.3
- **Build Tool**: Vite 5.4.11
- **Styling**: TailwindCSS 3.4.14
- **Routing**: React Router DOM 6.26.2
- **State Management**: TanStack Query 5.59.20, Zustand 5.0.1
- **Form Handling**: React Hook Form 7.53.1
- **Validation**: Zod 3.23.8
- **HTTP Client**: Axios 1.7.7

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Backend API running on http://localhost:3000

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Configure environment variables in `.env`:
```env
VITE_API_URL=http://localhost:3000
VITE_API_VERSION=v1
VITE_API_TIMEOUT=30000
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:3001

### Build

Create a production build:
```bash
npm run build
```

### Preview

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── app/                    # Application configuration
│   ├── main.tsx           # Entry point
│   ├── App.tsx            # Root component
│   ├── router.tsx         # Routing configuration
│   └── providers.tsx      # Global providers
├── pages/                 # Page components
│   ├── layouts/          # Layout components
│   ├── Home/             # Home page
│   └── NotFound/         # 404 page
├── domain/               # Business domains
│   └── [domainName]/    # Domain-specific code
├── core/                 # Shared core functionality
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom hooks
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript types
│   └── lib/             # Library configurations
└── assets/              # Static assets
    └── styles/          # Global styles
```

## API Integration

The application integrates with a REST API backend:

- **Public endpoints**: `/api/v1/external/*` (no authentication)
- **Protected endpoints**: `/api/v1/internal/*` (requires authentication)

API clients are configured in `src/core/lib/api.ts`:
- `publicClient`: For public endpoints
- `authenticatedClient`: For protected endpoints (auto-adds auth token)

## Development Guidelines

### Component Structure
Each component follows this structure:
```
ComponentName/
├── main.tsx      # Component implementation
├── types.ts      # TypeScript types
├── variants.ts   # Style variants (if applicable)
└── index.ts      # Exports
```

### Naming Conventions
- **Components**: PascalCase (e.g., `TaskCard`)
- **Files**: camelCase for utilities, PascalCase for components
- **Hooks**: camelCase with `use` prefix (e.g., `useTaskList`)
- **Types**: PascalCase with descriptive suffixes (e.g., `TaskCardProps`)

### State Management
- Use TanStack Query for server state
- Use Zustand for complex client state
- Use React hooks for local component state

### Styling
- Use TailwindCSS utility classes
- Use `cn()` utility for conditional classes
- Follow mobile-first responsive design

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Follow the established project structure
2. Write TypeScript with strict type checking
3. Add JSDoc comments for all public APIs
4. Test components before committing
5. Follow the naming conventions

## License

Private - All rights reserved