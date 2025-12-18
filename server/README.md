# Taglay Server (Backend)

The backend API for **Taglay**, built with **Node.js**, **Express**, and **MongoDB**. It handles authentication, business logic, data persistence, and validation for the marketplace platform.

---

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express v5
- **Database:** MongoDB + Mongoose v9
- **Validation:** Zod
- **Authentication:** JWT (HttpOnly Cookies) + BcryptJS
- **Security:** Helmet, CORS, Cookie-Parser

---

## 🚀 Setup & Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file in the root of the `server` directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taglay
JWT_SECRET=your_super_complex_secret_key_123
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```
*   **MONGO_URI**: Connection string for your MongoDB Atlas cluster or local instance.
*   **CLIENT_URL**: The URL of your React frontend (used for CORS).

### 3. Run Development Server
```bash
npm run dev
```
This starts the server with `nodemon` for hot-reloading on port 5000.

### 4. Database Seeding
To populate the database with dummy data (Products, Users, Orders):
```bash
node seeder.js
```
**Warning:** This script **deletes all existing data** in the connected database before inserting new records.

---

## 📂 Directory Structure

```text
src/
├── config/         # Configuration (DB connection)
├── controllers/    # Route logic (Req/Res handling)
├── middleware/     # Custom Middleware
│   ├── authMiddleware.js  # Protects routes & checks roles
│   └── errorHandler.js    # Global error handling
├── models/         # Mongoose Schemas
│   ├── User.js     # Farmers & Buyers (Extended fields)
│   ├── Product.js  # Inventory items
│   └── Order.js    # Transaction records
├── routes/         # API Endpoint definitions
│   ├── authRoutes.js
│   ├── dashboardRoutes.js
│   ├── orderRoutes.js
│   └── productRoutes.js
├── utils/          # Helpers
│   ├── generateToken.js  # JWT creation
│   └── validation.js     # Zod schemas
└── app.js          # Express app setup
```

---

## 🔐 API Overview

### Authentication (`/api/auth`)
- `POST /register`: Create a new user (Farmer/Buyer).
- `POST /login`: Authenticate and set HttpOnly cookie.
- `POST /logout`: Clear auth cookie.
- `GET /me`: Get current user profile (Session check).

### Products (`/api/products`)
- `GET /`: List products (supports pagination `?page=1&limit=12` and filtering `?category=coffee`).
- `GET /:id`: Get single product details.
- `POST /`: Create product (Farmers only).
- `PUT /:id`: Update product (Farmers only).
- `DELETE /:id`: Delete product (Farmers only).

### Orders (`/api/orders`)
- `POST /`: Create a new order (Buyers only).
- `GET /myorders`: Get order history (Role-contextual).
- `PUT /:id/pay`: Mark as paid.
- `PUT /:id/deliver`: Mark as delivered.

### Dashboard (`/api/dashboard`)
- `GET /stats`: Aggregated analytics (Total Sales, Order Counts, Spending) based on user role.

---

## 🛡 Security Features

1.  **HttpOnly Cookies:** JWTs are not accessible via JavaScript, preventing XSS attacks.
2.  **Strict Validation:** `Zod` middleware validates all request bodies before they reach the controller.
3.  **Role-Based Access:** `protect` and `admin` middleware ensure users can only access data relevant to their role.
