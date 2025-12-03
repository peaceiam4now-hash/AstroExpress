# 🚀 AstroExpress

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v5.0+-blue.svg)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)

**NodeJS + Express Boilerplate by Astronaut UI**

A production-ready Express.js boilerplate inspired by the [Astronaut UI Design System](https://www.astrouxds.com/) (Astro UXDS), built for mission-critical applications with security, performance, and developer experience in mind.

## ✨ Features

- 🚀 **Express.js v5** - Fast, unopinionated web framework
- 🔒 **Security First** - Helmet.js for secure HTTP headers
- ⚡ **Performance** - Compression middleware for optimized responses
- 🌐 **CORS Enabled** - Cross-Origin Resource Sharing configured
- 📝 **Request Logging** - Morgan logger for development and production
- 🎨 **Astronaut UI Ready** - Prepared for space-themed applications
- 🔧 **Environment Config** - dotenv for configuration management
- 🛠️ **Developer Experience** - Nodemon for hot reloading
- 📁 **Organized Structure** - MVC-like architecture with routes, controllers, and middleware
- 🎯 **Error Handling** - Centralized error handling middleware
- 📦 **Static File Serving** - Built-in support for serving static assets

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/peaceiam4now-hash/AstroExpress.git
cd AstroExpress
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example environment file and update as needed:

```bash
cp .env.example .env
```

### 4. Start the development server

```bash
npm run dev
```

The server will start at `http://localhost:3000`

### 5. For production

```bash
npm start
```

## 📁 Project Structure

```
AstroExpress/
├── src/
│   ├── app.js                 # Main application file
│   ├── config/
│   │   └── index.js          # Configuration settings
│   ├── controllers/
│   │   └── apiController.js  # API controller logic
│   ├── middleware/
│   │   ├── errorHandler.js   # Error handling middleware
│   │   └── requestLogger.js  # Request logging middleware
│   └── routes/
│       ├── api.js            # API routes
│       └── index.js          # Web routes
├── public/
│   ├── css/
│   │   └── styles.css        # Astronaut UI themed styles
│   ├── js/
│   │   └── app.js            # Frontend JavaScript
│   ├── images/               # Static images
│   └── index.html            # Landing page
├── .env                      # Environment variables (not in git)
├── .env.example             # Example environment variables
├── .gitignore               # Git ignore rules
├── package.json             # Project dependencies
├── LICENSE                  # License file
└── README.md               # This file
```

## 🔌 API Endpoints

### Base URL: `http://localhost:3000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api` | API welcome message |
| GET | `/api/health` | Server health check |

### Example Response

```json
{
  "success": true,
  "message": "Server is running",
  "data": {
    "appName": "AstroExpress",
    "version": "1.0.0",
    "environment": "development",
    "timestamp": "2024-12-03T21:56:00.000Z"
  }
}
```

## ⚙️ Configuration

Environment variables can be configured in the `.env` file:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Application Settings
APP_NAME="AstroExpress"
APP_VERSION="1.0.0"

# Security
CORS_ORIGIN=*

# Logging
LOG_LEVEL=dev
```

## 🛠️ Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start the production server |
| `npm run dev` | Start the development server with hot reload |
| `npm test` | Run tests (placeholder) |

## 🔒 Security Features

- **Helmet.js** - Sets various HTTP headers for security
- **CORS** - Configurable Cross-Origin Resource Sharing
- **Environment Variables** - Sensitive data stored securely
- **Error Handling** - Safe error messages in production

### Security Recommendations for Production

For production deployments, consider adding:

- **Rate Limiting** - Implement rate limiting using `express-rate-limit` to protect against brute-force attacks
- **Input Validation** - Add input validation middleware for user-submitted data
- **Authentication** - Implement JWT or session-based authentication
- **HTTPS** - Always use HTTPS in production environments
- **Content Security Policy** - Configure CSP headers for additional XSS protection

## 🎨 Astronaut UI Design System

This boilerplate is inspired by the [Astronaut UI Design System](https://www.astrouxds.com/) (Astro UXDS), a comprehensive design system created for mission-critical space and defense applications. The included landing page features:

- Space-themed color palette
- Dark mode by default
- Mission-critical design principles
- Accessible and responsive layout

## 📦 Technology Stack

- **Express.js** - Web application framework
- **Node.js** - JavaScript runtime
- **Helmet.js** - Security middleware
- **Morgan** - HTTP request logger
- **CORS** - Cross-Origin Resource Sharing
- **Compression** - Response compression
- **dotenv** - Environment variable management
- **Nodemon** - Development auto-reload

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [Astronaut UI Design System](https://www.astrouxds.com/)
- Built for mission-critical applications
- Designed for space and defense operational environments

## 📞 Support

For questions or issues, please open an issue on GitHub.

---

**Built with ❤️ and 🚀 by the AstroExpress team**