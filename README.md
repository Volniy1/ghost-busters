# Ghost-busters project

## RU

SPA на базе Next.js (App Router) для мониторинга аномалий (духов) в реальном времени.

## Интерактивная карта

Если интерестно есть ветка с картой Токио, где будут отображаться "положения" призраков

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

## Docker

This project includes Docker support for containerized deployment.

### Using Docker Compose (Recommended)

The easiest way to run the application with Docker:

```bash
docker-compose up --build
```

This will build the Docker image and start the container. The application will be available at [http://localhost:3000](http://localhost:3000).

To run in detached mode:

```bash
docker-compose up -d --build
```

To stop the container:

```bash
docker-compose down
```

### Using Dockerfile Directly

Build the Docker image:

```bash
docker build -t ghost-busters:latest .
```

Run the container:

```bash
docker run -p 3000:3000 ghost-busters:latest
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Docker Image Details

The Dockerfile uses a multi-stage build process:

- **Stage 1 (deps)**: Installs dependencies
- **Stage 2 (builder)**: Builds the Next.js application
- **Stage 3 (runner)**: Creates a minimal production image with only necessary files

The final image runs as a non-root user (`nextjs`) for security and uses Next.js standalone output mode for optimal performance.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
