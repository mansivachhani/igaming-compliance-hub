# iGaming Compliance Hub

A practical compliance operations app for online gambling teams to track regulations, prioritize remediation, and keep audit-ready evidence across regulated markets.

## Live Demo

- [iGaming Compliance Hub](https://igaming-compliance-hub.vercel.app)

## Purpose

This project helps legal, compliance, and product teams answer three daily questions quickly:

1. What changed recently in each market?
2. What must be fixed first to reduce licensing risk?
3. Who owns each action and when is it due?

## Current Market Coverage

- United Kingdom (UKGC)
- Sweden (Spelinspektionen)
- Italy (ADM)
- Spain (DGOJ)

## Key Features

- Country rulebooks with obligations, risk signals, and official source links
- Latest regulatory milestones per market on the dashboard
- "Today's Priorities" triage queue for urgent controls
- Action Center with:
  - owner assignment
  - due dates
  - complete/reopen workflow
  - audit trail timestamps
  - CSV export of filtered actions
- Per-country progress and overdue visibility on cards

## Main Routes

- `/` Dashboard: country overview, latest updates, priority triage
- `/country/[slug]` Rulebook: detailed country controls and sources
- `/action-center` Action workflow: remediation management and export

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- localStorage-backed task state

## Local Development

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Quality Checks

```bash
npm run lint
npm run build
```

## Data Structure

- Regulation content: `src/lib/regulation-data.ts`
- Action state + prioritization: `src/lib/action-center-state.ts`

## Notes

- This tool supports compliance operations and documentation.
- It is not legal advice; final interpretation should be validated by local legal counsel.

## Repository

- [GitHub](https://github.com/mansivachhani/igaming-compliance-hub)
