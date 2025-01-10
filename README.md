# Log Management API

This README provides an overview of a RESTful API for managing and querying logs. The API is designed to allow applications to share logs and enable users to search and view logs efficiently.

---

## **Table of Contents**
1. [Introduction](#introduction)
2. [Features](#features)
3. [Getting Started](#getting-started)
4. [API Endpoints](#api-endpoints)
5. [Authentication](#authentication)
6. [Error Handling](#error-handling)
7. [Environment Variables](#environment-variables)
8. [Example Requests](#example-requests)

---

## **1. Introduction**
The Log Management API allows developers to manage logs across multiple applications by providing endpoints to create, retrieve, and search logs. It is a secure API that supports authentication and authorization to protect sensitive log data.

---

## **2. Features**
- Create, read, and search logs.
- Secure authentication using tokens.
- Pagination support for large log queries.
- Role-based access control to manage log access.

---

## **3. Getting Started**
### **Prerequisites**
- Node.js and npm installed.
- MongoDB instance (local or remote).

### **Installation**
Clone the repository and install dependencies:
```bash
git clone https://github.com/yourusername/log-management-api.git
cd log-management-api
npm install
```

### **Run the API**
```bash
npm start
```
The API will be available at **http://localhost:3000**.

---

## **4. API Endpoints**

### **Authentication**
| Method | Endpoint       | Description              |
|--------|----------------|--------------------------|
| POST   | /auth/register | Register a new user      |
| POST   | /auth/login    | Login and get a token    |

### **Logs**
| Method | Endpoint       | Description              |
|--------|----------------|--------------------------|
| POST   | /logs          | Create a new log entry   |
| GET    | /logs          | Retrieve all logs        |
| GET    | /logs/:id      | Retrieve a specific log  |
| GET    | /logs/search   | Search logs by query     |

---

## **5. Authentication**
The API uses **JSON Web Tokens (JWT)** for authentication. After logging in, users receive a token that must be included in the **Authorization** header for protected routes.

Example:
```http
Authorization: Bearer <your-token>
```

---

## **6. Error Handling**
The API returns standardized error responses. Below is an example error format:
```json
{
  "error": true,
  "message": "Invalid token"
}
```

| Status Code | Description        |
|-------------|--------------------|
| 400         | Bad Request        |
| 401         | Unauthorized       |
| 404         | Not Found          |
| 500         | Internal Server Error |

---

## **7. Environment Variables**
Create a **.env** file to configure your environment variables:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/logs
JWT_SECRET=your_jwt_secret
```

---

## **8. Example Requests**

### **Register a User**
```http
POST /auth/register
Content-Type: application/json

{
  "username": "user1",
  "password": "securepassword"
}
```

### **Create a Log Entry**
```http
POST /logs
Authorization: Bearer <your-token>
Content-Type: application/json

{
  "application": "MyApp",
  "level": "info",
  "message": "This is a log message."
}
```

### **Search Logs**
```http
GET /logs/search?query=error
Authorization: Bearer <your-token>
```

