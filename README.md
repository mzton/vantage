# Vantage - PropTech Super-App

> "Search by location, stay for the view."

A next-generation property visualization platform built with **Next.js 14+**, **Mapbox GL**, and a professional **layered architecture**.

## Features

- **Immersive 3D Map**: Dynamic terrain, 3D building extrusions, and sky atmosphere
- **Smart Clustering**: Zoom-based marker clustering with smooth transitions
- **Price Tag Markers**: Floating price tags at high zoom levels
- **AI Assistant**: Property analysis and market insights
- **Responsive Design**: Optimized for desktop and mobile

## Architecture

This project follows a **layered architecture** pattern for scalability and maintainability:

```
src/
├── app/                    # Next.js App Router (Pages)
│   ├── api/               # API Routes
│   ├── components/        # Page-specific components
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
│
├── domain/                 # Domain Layer (Core Business Logic)
│   ├── entities/          # Business entities (Listing, Map, Chat)
│   ├── interfaces/        # Repository & service contracts
│   └── types/             # Type definitions
│
├── services/              # Infrastructure Layer (External Services)
│   ├── api/              # Data repositories
│   ├── map/              # Mapbox service & layer configs
│   └── ai/               # AI service
│
├── stores/                # Application Layer (State Management)
│   ├── map.store.ts      # Map view state
│   ├── listings.store.ts # Listings state
│   └── chat.store.ts     # Chat state
│
├── hooks/                 # Custom React Hooks
│   ├── useMapbox.ts      # Mapbox token management
│   ├── useGeolocation.ts # Browser geolocation
│   └── useDirections.ts  # Route directions
│
├── features/              # Feature Modules
│   ├── map/              # Map visualization
│   ├── listings/         # Property listings
│   └── ai-assistant/     # AI chat interface
│
├── components/            # Shared UI Components
│   ├── ui/               # Primitive components
│   └── layout/           # Layout components
│
├── lib/                   # Utilities & Third-party
│   ├── utils.ts          # Helper functions
│   └── supabase.ts       # Database client
│
└── config/                # Configuration
    ├── constants.ts      # App constants
    └── env.ts            # Environment config
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14+ (App Router) |
| Map Engine | Mapbox GL JS + react-map-gl |
| State Management | Zustand |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL + PostGIS) |
| Language | TypeScript |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Mapbox Access Token

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Mapbox token

# Run development server
npm run dev
```

### Environment Variables

```env
# Required
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_mapbox_token

# Optional (for full features)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
GEMINI_API_KEY=your_gemini_key
```

## Project Structure Benefits

### Domain-Driven Design
- Clear separation between business logic and infrastructure
- Easy to test and maintain
- Framework-agnostic core logic

### Feature-Based Organization
- Self-contained feature modules
- Easy to add/remove features
- Clear ownership and dependencies

### Type Safety
- Full TypeScript coverage
- Interface-driven development
- Runtime type checking with domain entities

## License

MIT
