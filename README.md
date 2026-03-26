This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

## Laravel BFF Setup

This project now uses Next.js Route Handlers as a BFF layer in front of Laravel.

- Browser calls Next.js endpoints (`/api/products`, `/api/products/:id`)
- Next.js server calls Laravel API using `LARAVEL_API_BASE_URL`
- Next.js returns Laravel response back to the browser

### Environment by stage

Create or update these files in project root:

- `.env.development`
- `.env.staging`
- `.env.production`

Each file must define:

```env
LARAVEL_API_BASE_URL=http://127.0.0.1:8000/api
```

### Exposed BFF routes

- `GET /api/products` -> `GET {LARAVEL_API_BASE_URL}/products`
- `POST /api/products` -> `POST {LARAVEL_API_BASE_URL}/products`
- `GET /api/products/:id` -> `GET {LARAVEL_API_BASE_URL}/products/:id`
- `PUT /api/products/:id` -> `PUT {LARAVEL_API_BASE_URL}/products/:id`
- `PATCH /api/products/:id` -> `PATCH {LARAVEL_API_BASE_URL}/products/:id`
- `DELETE /api/products/:id` -> `DELETE {LARAVEL_API_BASE_URL}/products/:id`

### Notes

- Keep Laravel CORS configured to allow your Next.js origin.
- For cookie auth (Sanctum), ensure cookie/session domain config matches your setup.
- Do not expose Laravel private secrets in `NEXT_PUBLIC_*` variables.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
