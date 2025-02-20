# MyTripAssistant B2B Dashboard

## Technologies Used

- [Next.js 15](https://nextjs.org/docs/getting-started)
- [HeroUI v2](https://heroui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)

## How to Use

### Install dependencies

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `npm`:

```bash
npm install  # Or: npm ci
```

### Run the development server

```bash
npm run dev
```

## Database

### Setup

```bash
docker compose up -d
```

### Migrations

```bash
npx prisma studio  # Open the Prisma Studio
npx prisma generate  # Generate the Prisma client
npx prisma migrate dev --name <the-name-of-the-change>  # Create a new migration
npx prisma migrate deploy  # Deploy the migration to the database
```
