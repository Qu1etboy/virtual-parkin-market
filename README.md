# Virtual ParkIn

> Brief project description: What is this Next.js project all about?

This is a Next.js project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). This project also uses Prisma for database interactions and is Dockerized for easy deployment and scalability.

## Table of Contents

- [Virtual ParkIn](#virtual-parkin)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Setting Environment Variables](#setting-environment-variables)
    - [Installation](#installation)
    - [Usage](#usage)
  - [Learn More](#learn-more)
  - [Contributing](#contributing)
  - [Deploy](#deploy)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)

## Getting Started

### Prerequisites

- Node.js
- Docker
- Prisma CLI

### Setting Environment Variables

Add your environment variables in a `.env` file. Example:

```env
DATABASE_URL="your_database_url_here"
NEXT_PUBLIC_API_URL="your_api_url_here"
```

### Installation

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Docker Setup**

   ```bash
   docker-compose up -d
   ```

3. **Prisma Setup**

   ```bash
   pnpx prisma generate
   pnpx prisma db push
   ```

## Setup stripe on local development

Install stripe cli

[⚠️ Please look at the doc for instruction](https://stripe.com/docs/stripe-cli#install)

Login to stripe (required stripe account)

```sh
stripe login
```

Forward event to a local webhook endpoint.

```sh
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Trigger events to test your webhooks integration.

```sh
stripe trigger payment_intent.succeeded
```

Finally, setup your key in `.env` file.

```env
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

### Usage

To start the development server, run:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Docker Documentation](https://docs.docker.com/)

## Contributing

Contributions are welcome! See the [Contributing Guide](CONTRIBUTING.md) for more details.

## Deploy

For easy deployment, use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- [Next.js](https://github.com/vercel/next.js/)
- [Prisma](https://github.com/prisma/prisma)
- [Docker](https://github.com/docker)
