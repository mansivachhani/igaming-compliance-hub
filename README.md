# iGaming Compliance Hub

A centralized compliance operations app for online gambling teams to track regulations, assess risk, and run remediation across multiple regulated markets.

## Demo

- Live demo: https://igaming-compliance-hub.vercel.app

## What This App Does

- Consolidates country-specific regulation tracking for UK, Sweden, Italy, and Spain.
- Surfaces urgent compliance actions with a prioritized "Today's Priorities" queue.
- Provides country rulebooks with latest regulatory milestones and control checklists.
- Tracks remediation in Action Center with owner assignment, due dates, completion state, and audit logs.
- Exports filtered action lists to CSV for legal/compliance review workflows.

## Core Pages

- Dashboard (`/`): market overview, latest updates, and priority triage.
- Country Rulebook (`/country/[slug]`): per-country obligations, risk signals, and source links.
- Action Center (`/action-center`): operational task management for compliance remediation.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Browser localStorage for action state persistence

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build and Lint

```bash
npm run lint
npm run build
```

## Data and Regulatory Notes

- Regulatory content is maintained in `src/lib/regulation-data.ts`.
- Prioritization and task persistence logic are in `src/lib/action-center-state.ts`.
- This app is an operations aid, not legal advice. Final interpretation should be validated by local legal counsel.

## Repository

- GitHub: https://github.com/mansivachhani/igaming-compliance-hub
