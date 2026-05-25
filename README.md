# KanbanBoard

A real-time collaborative kanban board application built with React 19, TypeScript, and Vite (Rolldown).

## Tech Stack

- **React 19** with TypeScript 5.9
- **Vite** (Rolldown-based v7) for build tooling
- **Tailwind CSS v4** for styling
- **shadcn/ui** (New York style) component library with CSS variables
- **React Router v7** for routing
- **TanStack React Query** for server state management
- **TanStack React Form** for form handling
- **Jotai** for atomic client-side state
- **Socket.IO Client** for real-time updates
- **Slate.js** for rich text editing
- **SortableJS** for drag-and-drop column/card reordering
- **next-themes** for dark/light theme support
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

# Start the development server
npm run dev
```

## Available Scripts

| Script           | Description                          |
| ---------------- | ------------------------------------ |
| `npm run dev`    | Start Vite development server        |
| `npm run build`  | TypeScript check + production build  |
| `npm run preview`| Preview the production build         |
| `npm run lint`   | Run ESLint                           |
| `npm run test`   | Run tests with Vitest                |

## Environment Variables

| Variable              | Description          |
| --------------------- | -------------------- |
| `VITE_BACKEND_API_URL`| Backend REST API URL |
| `VITE_BACKEND_WS_URL` | WebSocket server URL |

## Project Structure

```
src/
├── atoms/              # Jotai atoms (modals, board actions)
├── components/         # React components
│   ├── ui/             # shadcn/ui primitives (button, card, dialog, etc.)
│   ├── Board*.tsx      # Board list, grid, header, detail, and card views
│   ├── Column.tsx      # Column rendering with drag-and-drop
│   ├── Card*.tsx       # Card components (display, add, detail, delete)
│   ├── Upsert*.tsx     # Create/update forms for boards, columns, cards
│   ├── Delete*.tsx     # Delete confirmation modals
│   ├── Modal*.tsx      # Modal dialogs (action, board)
│   ├── RichTextEditor.tsx  # Slate.js rich text editor
│   ├── InviteBoard.tsx     # Board invitation UI
│   ├── UserMenu.tsx        # User dropdown menu
│   └── Loader.tsx          # Loading spinner
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── interfaces/         # TypeScript interfaces
│   ├── board.interface.ts
│   ├── column.interface.ts
│   ├── card.interface.ts
│   └── action.interface.ts
├── lib/                # Utility modules
│   ├── auth.ts         # Authentication helpers
│   ├── socket.ts       # WebSocket client
│   ├── sortable.ts     # SortableJS integration
│   ├── slate-utils.ts  # Slate editor utilities
│   ├── time.ts         # Time formatting
│   └── utils.ts        # General utilities (cn, etc.)
├── pages/              # Route pages
│   ├── HomePage        # Board listing and creation
│   ├── BoardPage       # Individual kanban board view
│   ├── AuthPage        # Authentication (login/register)
│   ├── InviteAcceptPage # Invitation token acceptance
│   └── NotFoundPage    # 404 page
├── test/               # Test files
│   ├── setup.ts        # Vitest setup
│   └── *.test.{ts,tsx} # Component and utility tests
├── types/              # TypeScript type declarations
├── App.tsx             # Root component with routing
├── App.css             # App-level styles
├── globals.css         # Global styles + Tailwind directives
└── main.tsx            # Application entry point
```

## Features

- **Board management**: Create, update, and delete boards
- **Column management**: Add, edit, remove, and reorder columns via drag-and-drop
- **Card management**: Create, update, delete, and reorder cards with rich text content
- **Rich text editing**: Card descriptions using the Slate.js editor
- **Real-time collaboration**: WebSocket-based synchronization via Socket.IO
- **User authentication**: Login and registration flow
- **Board invitations**: Invite users via shareable invitation links
- **Responsive design**: Mobile-friendly layout with Tailwind CSS
- **Dark/light theme**: Built-in theme switching via next-themes
- **Toast notifications**: User feedback via sonner toasts

## Related projects

- [KanbanBoard Backend](https://github.com/CarSeP/KanbanBoard-Backend) — REST API and WebSocket server for this frontend

## License

MIT
