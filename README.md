# Atithi's Academy Backend

A production-ready Node.js, Express.js, and MongoDB (Mongoose) backend for handling admissions and contact enquiries. Follows a clean MVC architecture.

## Features

- **MVC Architecture**: Proper separation of concerns with controllers, models, and routes.
- **Security**: Robust security configuration using `helmet` headers, `cors`, and IP-based rate limiting.
- **Validation**: Input sanitization and validation using `express-validator`.
- **Global Error Handling**: Centralized error interceptor reporting clean error structures.
- **Logging**: Morgan integrated for standard request logs.

---

## Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas instance)

---

## Getting Started

### 1. Installation

Navigate to the `backend/` directory and install the dependencies:

```bash
cd backend
npm install
```

### 2. Environment Setup

Copy `.env.example` to create your local `.env` file:

```bash
cp .env.example .env
```

Open `.env` and supply your database connection string and desired port:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/atithis_academy
```

### 3. Running Locally

To run the application in development mode with auto-reload (via `nodemon`):

```bash
npm run dev
```

To start the server in production mode:

```bash
npm start
```

The server will log `MongoDB Connected: <host>` upon successful database connection.

---

## API Documentation

### 1. Health Check

Checks if the server is healthy.

- **Endpoint**: `GET /health`
- **Response**:
  ```json
  {
    "status": "ok"
  }
  ```

### 2. Admissions Enquiry

Submit a new admission enquiry.

- **Endpoint**: `POST /api/admissions`
- **Request Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "9876543210",
    "message": "I want to know about the hospitality course."
  }
  ```
- **Validation Rules**:
  - `name`: Required, minimum 2 characters.
  - `email`: Required, must be a valid email format.
  - `phoneNumber`: Required, minimum 10 digits.
  - `message`: Required.
- **Success Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Admission enquiry submitted successfully.",
    "data": {
      "_id": "60d0fe4f53112b4f2c8b4567",
      "name": "John Doe",
      "email": "john@example.com",
      "phoneNumber": "9876543210",
      "message": "I want to know about the hospitality course.",
      "createdAt": "2026-08-07T11:11:20.000Z",
      "updatedAt": "2026-08-07T11:11:20.000Z",
      "__v": 0
    }
  }
  ```

### 3. Contact Enquiry

Submit a new general or support enquiry.

- **Endpoint**: `POST /api/contact`
- **Request Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phoneNumber": "9876543210",
    "message": "I have a question regarding admissions."
  }
  ```
- **Validation Rules**:
  - Same as Admissions Enquiry.
- **Success Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Contact enquiry submitted successfully.",
    "data": {
      "_id": "60d0fe4f53112b4f2c8b4568",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "phoneNumber": "9876543210",
      "message": "I have a question regarding admissions.",
      "createdAt": "2026-08-07T11:11:20.000Z",
      "updatedAt": "2026-08-07T11:11:20.000Z",
      "__v": 0
    }
  }
  ```

---

## Error Formats

### Validation Errors (400 Bad Request)

Returned when one or more payload fields fail constraints:

```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```

### Global Server Errors (500 Internal Server Error)

Returned when an unhandled server-side failure occurs:

```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

## Example cURL Requests

### Submit Admission (Success)

```bash
curl -X POST http://localhost:5000/api/admissions \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "phoneNumber": "9876543210", "message": "Hospitality course info please."}'
```

### Submit Contact (Validation Error)

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "J", "email": "invalid-email", "phoneNumber": "123", "message": ""}'
```
