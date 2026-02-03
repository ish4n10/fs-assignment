This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Where components and pages live

| What you see | Where the code is |
|--------------|-------------------|
| **Landing** (4 steps: name, role, experience, company) | `app/page.tsx` - main component, `STEPS` config, and the card/input/Enter button UI |
| **Resume upload page** (drop resume, filter pill, Upload button) | `app/components/landingPage.tsx` - `ResumePage` |
| **Job list page** (“X Jobs found”, scrollable list of job cards) | `app/components/landingPage.tsx` - `CompanyPage` |
| **Job detail page** (single job: description, responsibilities, skills, Apply) | `app/components/landingPage.tsx` - `JobDetailPage` |
| **Notification preferences page** (bell, dropdown, Continue) | `app/components/landingPage.tsx` - `NotificationPreferencesPage` |
| **Plan selection page** (Free ₹0 / Paid ₹399, Continue) | `app/components/landingPage.tsx` - `PlanSelectionPage` |

**Routing / flow**  
`app/page.tsx` holds the app state(onboarding -> resume -> company ->  job detail -> notification prefs -> plan selection). It imports and renders `ResumePage`, `CompanyPage`, `JobDetailPage`, `NotificationPreferencesPage`, and `PlanSelectionPage` from `app/components/landingPage.tsx`.

- Mock data used by the UI: `app/mock-data.json` (job list, job details, notification options, plan benefits).

## Getting Started

First, run the development server:

```bash
npm i
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


