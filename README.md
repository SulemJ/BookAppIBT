<!-- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->

# CodeOps Book Store

An e-commerce storefront built with Next.js 15 (App Router), Zustand, and the Gutendex API.

## Project Architecture

- **Catalog/Products:** Fetched live from the Gutendex public API using Next.js Server Components.
- **State Management:** Zustand implementation (`cartStore.ts`) handles global cart persistence across routes.
- **Routing:** App Router implementation handling nested layouts, dynamic checkout flows, and search query parameters.

## Orders & Testing

- **Form Validation:** The checkout form strictly requires standard inputs and validates a 16-digit credit card pattern before allowing submission.
- **State Cleanup:** Successfully submitting an order purges the global Zustand cart state to prevent duplicate orders.
- **Dynamic Confirmation:** Navigates via `next/navigation` to a dedicated `/confirmation` route, passing the securely generated `orderId` via search parameters.

## Checkout & Performance Measurements

_Note: The following metrics were captured during the local production build (`npm run build`)._

| Route            | Type             | Strategy                                                                                             |
| :--------------- | :--------------- | :--------------------------------------------------------------------------------------------------- |
| `/` (Storefront) | Server / Dynamic | Uses `instant = false` to allow non-blocking live catalog fetching while rendering the static shell. |
| `/cart`          | Client           | Bundles Zustand logic for instant state updates without network waterfalls.                          |
| `/checkout`      | Client           | Contains controlled form state and routing logic.                                                    |
| `/confirmation`  | Server / Dynamic | Awaits `searchParams` to render the exact order number server-side.                                  |

### CodeOps Optimizations Applied

1. **Deduplication:** State management uses a single unified store rather than prop-drilling or context-wrapping the entire app.
2. **First Load JS:** Minimized by keeping the heavy catalog rendering entirely on the server in `app/page.tsx`. Only the interactive `AddToCartButton` is shipped to the client.
3. **Loading States:** Implemented simulated network delays combined with disabled UI states on the checkout button to prevent double-charging users during slow connections.
