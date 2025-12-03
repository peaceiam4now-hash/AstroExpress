# genieExpressJS Core

Production-ready Express + TypeScript authentication boilerplate.

## Features

- 🔐 **JWT Authentication** - Secure token-based authentication with HS256
- 🗄️ **Prisma ORM** - Type-safe database access with PostgreSQL
- 🐳 **Docker Ready** - Docker Compose for PostgreSQL
- ✅ **Tested** - Comprehensive test suite with Jest
- 🔒 **Password Security** - bcrypt with 12 salt rounds
- 📝 **Validation** - Request validation with Zod
- 🚀 **TypeScript** - Full TypeScript support with strict mode

## Prerequisites

- Node.js 18+
- Docker & Docker Compose
- npm or yarn

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AstroExpress
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Start PostgreSQL with Docker**
   ```bash
   docker-compose up -d
   ```

5. **Run database migrations**
   ```bash
   npx prisma migrate dev --name init
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:4000`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with ts-node |
| `npm run build` | Build TypeScript to JavaScript |
| `npm start` | Start production server |
| `npm test` | Run tests with coverage |
| `npm run test:watch` | Run tests in watch mode |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:migrate` | Run database migrations |

## API Endpoints

### Health Check

```http
GET /health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Authentication

#### Register

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response (201):
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  },
  "token": "jwt-token"
}
```

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response (200):
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  },
  "token": "jwt-token"
}
```

#### Get Current User (Protected)

```http
GET /auth/me
Authorization: Bearer <token>
```

Response (200):
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Error Responses

All errors follow this format:

```json
{
  "status": "error",
  "message": "Error description"
}
```

| Status Code | Description |
|-------------|-------------|
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid or missing token |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error |

## Project Structure

```
├── prisma/
│   └── schema.prisma      # Database schema
├── src/
│   ├── controllers/       # Route controllers
│   │   └── auth.controller.ts
│   ├── lib/
│   │   └── prisma.ts      # Prisma client
│   ├── middleware/
│   │   ├── auth.ts        # JWT authentication
│   │   └── errorHandler.ts
│   ├── routes/
│   │   └── auth.routes.ts
│   ├── utils/
│   │   ├── jwt.ts         # JWT utilities
│   │   └── password.ts    # Password hashing
│   ├── validators/
│   │   └── auth.validator.ts
│   └── server.ts          # Express app
├── tests/
│   ├── auth.test.ts       # Authentication tests
│   └── setup.ts           # Test setup
├── docker-compose.yml
├── Dockerfile
├── jest.config.js
├── package.json
├── tsconfig.json
└── README.md
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment (development/production/test) | development |
| `PORT` | Server port | 4000 |
| `DATABASE_URL` | PostgreSQL connection string | - |
| `JWT_SECRET` | Secret key for JWT signing | - |

## Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

The test suite includes 20+ tests covering:
- User registration
- User login
- Protected routes
- Token validation
- Password hashing
- Input validation

## Docker

### Development with Docker Compose

Start PostgreSQL:
```bash
docker-compose up -d
```

Stop PostgreSQL:
```bash
docker-compose down
```

### Build Docker Image

```bash
docker build -t genie-express-js .
```

### Run Docker Container

```bash
docker run -p 4000:4000 --env-file .env genie-express-js
```

## Security Notes

- Change `JWT_SECRET` in production
- Passwords are hashed with bcrypt (12 rounds)
- Tokens expire after 24 hours
- Use HTTPS in production

## License

MIT