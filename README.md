# Nexora — African Creator Marketplace

> **The premier African marketplace connecting verified content creators with impactful brands.**

Nexora is a full-featured creator marketplace platform that enables brands to discover talent, launch campaigns, and track performance — while giving creators tools to manage their portfolio, apply to campaigns, and engage with brand partners.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup & Installation](#setup--installation)
- [Environment & API Configuration](#environment--api-configuration)
- [Available Scripts](#available-scripts)
- [Routing](#routing)
- [Authentication](#authentication)
- [User Roles](#user-roles)

---

## Overview

Nexora is a **React + TypeScript** single-page application (SPA) built with **Vite** and styled using **Tailwind CSS**. It communicates with a Django REST Framework backend over HTTP (JWT-authenticated) and uses **WebSockets** for real-time chat functionality.

Key capabilities:

- Data-driven creator–brand matching with fit scores
- Campaign creation, management, and application workflows
- Secure escrow payment support
- Live campaign post tracking and analytics
- Real-time in-app chat between brands and creators
- Social intelligence dashboard (mentions, sentiment, brand perception)
- AI-assisted features (response suggestions, summarisation, search)

---

## Tech Stack

| Layer       | Technology                                      |
| ----------- | ----------------------------------------------- |
| Framework   | [React 18](https://react.dev/)                  |
| Language    | TypeScript 5                                    |
| Build Tool  | [Vite 5](https://vitejs.dev/)                   |
| Routing     | [React Router DOM v6](https://reactrouter.com/) |
| Styling     | [Tailwind CSS v3](https://tailwindcss.com/)     |
| HTTP Client | [Axios](https://axios-http.com/)                |
| Icons       | [Lucide React](https://lucide.dev/)             |
| PDF Export  | [jsPDF](https://github.com/parallax/jsPDF)      |
| PostCSS     | autoprefixer                                    |

---

## Project Structure

```
frontend/
├── index.html                   # App shell / entry HTML
├── vite.config.ts               # Vite build configuration
├── tailwind.config.js           # Tailwind theme configuration
├── postcss.config.js            # PostCSS configuration
├── package.json                 # Dependencies and scripts
└── src/
    ├── main.tsx                 # React DOM entry point
    ├── index.css                # Global styles
    ├── App.tsx                  # Root component, Navbar, routing
    ├── context/
    │   └── AuthContext.tsx      # Global auth state (user, login, logout)
    ├── services/
    │   ├── api.ts               # Axios instance + JWT interceptor
    │   └── auth.ts              # Auth API calls (login, register, logout)
    ├── components/
    │   ├── ProtectedRoute.tsx   # Route guard (auth + role-based)
    │   └── NotificationManager.tsx  # In-app notification system
    └── pages/
        ├── Login.tsx            # Login page
        ├── Register.tsx         # Registration page (brand / creator)
        ├── Dashboard.tsx        # User dashboard (role-aware)
        ├── Discover.tsx         # Browse & search creators
        ├── PublicProfile.tsx    # Public creator profile view
        ├── CreatorProfile.tsx   # Creator's own profile editor
        ├── Campaigns.tsx        # Browse active campaigns
        ├── CreateCampaign.tsx   # Create / edit a campaign
        ├── CampaignCandidates.tsx  # View & manage campaign applicants
        ├── ApplyCampaign.tsx    # Apply to a campaign (creators)
        ├── Applications.tsx     # View all applications (both roles)
        ├── Chat.tsx             # Real-time chat (brand ↔ creator)
        ├── Analytics.tsx        # Campaign analytics & ROI tracking
        └── SocialIntelligence.tsx  # Social mentions & sentiment tool
```

---

## Features

### For Brands

- **Discover Talent** — Browse a searchable directory of verified creators filtered by niche, platform, and engagement rate.
- **Campaign Management** — Create, edit, and manage campaigns. Track status and performance.
- **Candidate Review** — View creator applications and invite or accept creators per campaign.
- **Analytics** — Track campaign ROI, spend, and creator performance metrics.
- **Social Intelligence** — Monitor brand mentions, sentiment trends, and social perception in real time.
- **Chat** — Communicate directly with accepted creators via real-time messaging.

### For Creators

- **Creator Profile** — Build and manage a public portfolio with platform links and key metrics.
- **Campaign Discovery** — Browse and apply to open campaigns that match your niche.
- **Applications Tracker** — View application statuses and manage collaborations.
- **Analytics** — See content performance across all joined campaigns.
- **Social Intelligence** — Research brand opportunities and monitor industry trends.
- **Chat** — Open a conversation with a brand once your application is accepted.

### Platform-Wide

- JWT-based authentication with automatic token attachment on every request.
- Role-based protected routes (brand / creator / public).
- In-app notification system for real-time alerts.
- PDF export support via jsPDF.

---

## Prerequisites

Before you begin, ensure you have the following installed:

| Tool                           | Version                                                   |
| ------------------------------ | --------------------------------------------------------- |
| [Node.js](https://nodejs.org/) | v18 or higher                                             |
| [npm](https://www.npmjs.com/)  | v9 or higher                                              |
| Backend API                    | Running Django backend (default: `http://localhost:8000`) |

---

## Setup & Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure API URL _(see next section)_

### 4. Start the development server

```bash
npm run dev
```

The app will be available at **http://localhost:5173** by default.

---

## Environment & API Configuration

The frontend currently points to the backend at a hardcoded base URL inside `src/services/api.ts`:

```ts
// src/services/api.ts
const API_URL = "http://localhost:8000/api";
```

To point the app at a different backend (e.g. staging or production), update this value directly, or — for a more scalable approach — create a `.env` file in the project root:

```env
# .env
VITE_API_BASE_URL=http://localhost:8000/api
```

Then update `src/services/api.ts` to read from the environment:

```ts
const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
```

> **Note:** All Vite environment variables must be prefixed with `VITE_` to be exposed to the browser bundle.

### WebSocket / Chat

The Chat page connects to the backend over WebSocket for real-time messaging. Ensure the backend's Django Channels server (typically on the same host/port as the API) is running. If running behind an HTTPS/WSS proxy in production, update the WebSocket connection URL accordingly within `src/pages/Chat.tsx`.

---

## Available Scripts

| Command           | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Start the Vite development server with hot reload    |
| `npm run build`   | Type-check and compile a production build to `dist/` |
| `npm run preview` | Locally preview the production build                 |

---

## Routing

All routes are defined in `src/App.tsx`. Protected routes require authentication via the `ProtectedRoute` component. Some routes are additionally restricted by user role.

| Path                                       | Page                      | Auth Required | Allowed Roles      |
| ------------------------------------------ | ------------------------- | ------------- | ------------------ |
| `/`                                        | Landing (Hero + Features) | No            | All                |
| `/login`                                   | Login                     | No            | All                |
| `/register`                                | Register                  | No            | All                |
| `/dashboard`                               | Dashboard                 | ✅ Yes        | All                |
| `/creators`                                | Discover Creators         | No            | All                |
| `/creators/me`                             | Creator Profile Editor    | ✅ Yes        | `creator`          |
| `/creators/:id`                            | Public Creator Profile    | ✅ Yes        | All                |
| `/campaigns`                               | Browse Campaigns          | No            | All                |
| `/campaigns/new`                           | Create Campaign           | ✅ Yes        | `brand`, `creator` |
| `/campaigns/:id/edit`                      | Edit Campaign             | ✅ Yes        | `brand`, `creator` |
| `/campaigns/:id/candidates`                | Campaign Candidates       | ✅ Yes        | `brand`, `creator` |
| `/campaigns/:id/apply`                     | Apply to Campaign         | ✅ Yes        | `creator`          |
| `/applications`                            | All Applications          | ✅ Yes        | All                |
| `/analytics`                               | Analytics Dashboard       | ✅ Yes        | All                |
| `/social-intelligence`                     | Social Intelligence       | ✅ Yes        | All                |
| `/campaigns/:campaignId/chat/:recipientId` | Chat                      | ✅ Yes        | All                |

---

## Authentication

Authentication is handled via **JSON Web Tokens (JWT)**:

1. On login, the backend returns `access` and `refresh` tokens.
2. Both tokens are stored in `localStorage`.
3. The Axios interceptor in `src/services/api.ts` automatically attaches the `access` token to every outbound request as a `Bearer` token in the `Authorization` header.
4. On logout, both tokens are removed and the user is redirected to `/login`.
5. On app load, `AuthContext` checks for an existing token and fetches the current user profile to restore session state.

---

## User Roles

Nexora has two primary user roles, set at registration:

| Role      | Description                                                                                                                       |
| --------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `brand`   | Companies or individuals looking to run influencer campaigns. Can create campaigns, review candidates, and manage collaborations. |
| `creator` | Content creators / influencers. Can build a public profile, apply for campaigns, and manage their collaborations.                 |

Role-specific UI elements (navbar links, dashboard cards, action buttons) are conditionally rendered based on the authenticated user's `role` field.

---

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Commit your changes: `git commit -m "feat: description of change"`
3. Push to the branch: `git push origin feature/your-feature-name`
4. Open a pull request for review.

---

_Built with ❤️ for the African creator economy by Nexora Technologies._
