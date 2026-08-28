# APIForge

> Production-style REST API engineering toolkit built with Node.js, Express and MongoDB.

[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

APIForge is a portfolio-grade backend foundation demonstrating modern API engineering patterns: authentication, authorization, password hashing, rate limiting, security middleware, structured routing, MongoDB persistence, OpenAPI documentation and environment-based configuration.

## Why APIForge

The project is intentionally small enough to understand quickly while covering important layers of a real backend service. It is designed to be extended into a larger SaaS API rather than being a throwaway CRUD example.

## Features

- JWT authentication with register and login flows
- Role-based authorization middleware
- Secure password hashing with bcrypt
- Protected user endpoints
- MongoDB persistence with a unique email index
- API versioning under `/api/v1`
- Security headers with Helmet
- CORS support
- JSON body-size limits
- HTTP request logging
- Configurable rate limiting
- Health check endpoint
- OpenAPI/Swagger UI
- Centralized 404 and error handling
- Environment-based configuration
- Node.js 20+ runtime

## Architecture

```text
Client
  |
  v
Express Application
  |
  +--> Security / CORS / Rate Limit / Logging
  |
  +--> /api/v1/auth ------> Authentication ------> MongoDB
  |
  +--> /api/v1/users -----> Auth / RBAC ----------> MongoDB
  |
  +--> /health
  |
  +--> /docs -------------> OpenAPI / Swagger UI
```

## Project Structure

```text
APIForge/
├── src/
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── users.js
│   ├── app.js
│   ├── config.js
│   ├── db.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Requirements

- Node.js 20 or newer
- npm 10+
- MongoDB 6+ locally or MongoDB Atlas

## Installation

```bash
git clone https://github.com/maazuh1997/APIForge.git
cd APIForge
npm install
cp .env.example .env
```

Update `.env` with a real JWT secret and MongoDB connection string.

Start the development server:

```bash
npm run dev
```

The API runs at `http://localhost:4000`.

## API Demo

### Health Check

```bash
curl http://localhost:4000/health
```

Example response:

```json
{
  "status": "ok",
  "service": "APIForge"
}
```

### Register

```bash
curl -X POST http://localhost:4000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Maaz","email":"maaz@example.com","password":"strong-password-123"}'
```

### Login

```bash
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"maaz@example.com","password":"strong-password-123"}'
```

Use the returned JWT for protected endpoints:

```bash
curl http://localhost:4000/api/v1/users/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## API Reference

Swagger UI is available after starting the server:

`http://localhost:4000/docs`

The API is versioned under `/api/v1` so future versions can evolve without unexpectedly breaking existing clients.

| Method | Endpoint | Auth | Purpose |
| --- | --- | --- | --- |
| GET | `/health` | No | Service health |
| POST | `/api/v1/auth/register` | No | Create an account |
| POST | `/api/v1/auth/login` | No | Authenticate a user |
| GET | `/api/v1/users/me` | User | Read current user |
| GET | `/api/v1/users` | Admin | List users |
| GET | `/docs` | No | Swagger UI |

## Configuration

| Variable | Required | Description |
| --- | --- | --- |
| `NODE_ENV` | No | Runtime environment |
| `PORT` | No | HTTP port, defaults to `4000` |
| `MONGODB_URI` | No | MongoDB connection URI |
| `JWT_SECRET` | Yes | Secret used to sign access tokens |
| `JWT_EXPIRES_IN` | No | Token lifetime |
| `RATE_LIMIT_WINDOW_MS` | No | Rate-limit window |
| `RATE_LIMIT_MAX` | No | Maximum requests per window |

Never commit `.env` or production secrets.

## Security Notes

APIForge includes baseline security controls, but it is a foundation rather than a security certification. Production deployments should additionally consider HTTPS termination, secret management, refresh-token rotation, account verification, password reset flows, audit logging, database backups, monitoring and infrastructure-level controls.

## Testing

The project reserves the standard Node.js test command:

```bash
npm test
```

Automated unit and integration coverage is part of the project roadmap.

## Deployment

APIForge can be deployed to any Node.js-compatible platform with a managed MongoDB instance. Configure environment variables in the hosting provider and start with:

```bash
npm start
```

For a public demo, deploy the API and expose `/health` and `/docs`. No production URL is claimed until an actual deployment exists.

## Roadmap

- [ ] Complete OpenAPI endpoint schemas
- [ ] Automated unit and integration test suite
- [ ] Refresh-token authentication
- [ ] Password reset and email verification
- [ ] Request validation schemas
- [ ] Structured application logging
- [ ] Docker image
- [ ] GitHub Actions CI
- [ ] Production deployment
- [ ] Observability and metrics

## License

MIT License. See `LICENSE` for details.

## Author

**Maaz Ul Haq**  
Full-Stack & AI Product Engineer

- GitHub: https://github.com/maazuh1997
- Profile: https://github.com/maazuh1997/maazuh1997
