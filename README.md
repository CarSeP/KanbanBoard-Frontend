# KanbanBoard

A real-time kanban board application built with React, TypeScript, and Vite.

## Tech Stack

- **React 19** with TypeScript
- **Vite** (Rolldown-based) for build tooling
- **Tailwind CSS v4** for styling
- **shadcn/ui** component library
- **React Router v7** for routing
- **TanStack React Query** for server state management
- **Jotai** for atomic client-side state
- **Socket.IO Client** for real-time updates
- **Lucide React** for icons
- **sonner** for toast notifications
- **Vitest** + **Testing Library** for testing

## Prerequisites

- Node.js >= 18
- npm

## Getting Started

```bash
# Clone the repository
git clone https://github.com/CarSeP/KanbanBoard-Frontend.git
cd KanbanBoard-Frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your variables:

# Start the development server
npm run dev
```

## Available Scripts

| Script        | Description                        |
| ------------- | ---------------------------------- |
| `npm run dev`    | Start Vite development server      |
| `npm run build`  | TypeScript check + production build |
| `npm run preview`| Preview the production build        |
| `npm run lint`   | Run ESLint                          |
| `npm run test`   | Run tests with Vitest               |

## Environment Variables

| Variable               | Description          |
| ---------------------- | -------------------- |
| `VITE_BACKEND_API_URL`   | Backend REST API URL |
| `VITE_BACKEND_WS_URL`    | WebSocket server URL |

## Project Structure

```
src/
├── atoms/          # Jotai atoms (state management)
├── components/     # React components
│   └── ui/         # shadcn/ui primitives
├── interfaces/     # TypeScript interfaces
├── lib/            # Utilities (socket, time, utils)
├── pages/          # Route pages
│   ├── HomePage    # Board listing
│   └── BoardPage   # Individual board view
├── App.tsx         # Root component with routing
├── globals.css     # Global styles + Tailwind
└── main.tsx        # Entry point
```

## Features

- Create, update, and delete boards
- Add, edit, and remove columns within boards
- Create, update, and delete cards with titles and content
- Real-time synchronization via WebSockets
- Responsive design with Tailwind CSS
- Dark/light theme support

## License

MIT
