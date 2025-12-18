# Taglay: B2B Agricultural Marketplace

**Taglay** is a modern B2B marketplace platform connecting Philippine farmers directly with bulk buyers. Built on the **MERN Stack** (MongoDB, Express, React, Node.js), it facilitates secure procurement, order tracking, and role-based management for the agricultural supply chain.

---

## 🏗 Architecture & Tech Stack

The project follows a **Monorepo** structure separating the Client (Frontend) and Server (Backend).

### **Frontend (`/client`)**
- **Core:** React 19 + Vite
- **Styling:** Tailwind CSS v4 + DaisyUI v5
- **State/Async:** TanStack Query (React Query) + Context API
- **Routing:** React Router DOM v7
- **UI Components:** Lucide React, Framer Motion, Aceternity UI (Bento Grids)

### **Backend (`/server`)**
- **Core:** Node.js + Express v5
- **Database:** MongoDB + Mongoose v9
- **Validation:** Zod (Strict schema validation)
- **Auth:** JWT (HttpOnly Cookies) + BcryptJS
- **Security:** Helmet, CORS

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18+)
- **MongoDB** (Local instance or Atlas Connection String)
- **Git**

### 2. Installation

Clone the repository and install dependencies for both applications.

```bash
# Clone the repo
git clone https://github.com/your-username/taglay.git
cd taglay

# Install Server Dependencies
cd server
npm install

# Install Client Dependencies
cd ../client
npm install
```

### 3. Environment Setup

You need to configure environment variables for both the client and server.

**Server (`server/.env`):**
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=mongodb+srv://<your-db-string> # or mongodb://localhost:27017/taglay
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

**Client (`client/.env`):**
Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Database Seeding (Optional but Recommended)
Populate your database with realistic mock data (Farmers, Buyers, Products, Orders).

```bash
cd server
node seeder.js
```
*Note: This will clear existing users/products and generate fresh data.*

### 5. Running the App

**Start Backend:**
```bash
# Terminal 1
cd server
npm run dev
# Server runs on http://localhost:5000
```

**Start Frontend:**
```bash
# Terminal 2
cd client
npm run dev
# Client runs on http://localhost:5173
```

---

## 📂 Project Structure

```text
/taglay
├── client/              # React Frontend
│   ├── src/
│   │   ├── components/  # Reusable UI (ProductCard, Navbar)
│   │   ├── dashboard/   # Role-specific Dashboard Widgets
│   │   ├── contexts/    # Global State (Auth, Motion)
│   │   ├── hooks/       # Custom Hooks (useOrders, useProducts)
│   │   ├── lib/         # Utilities (Axios, Formatters)
│   │   ├── pages/       # Route Views (Marketplace, Dashboard)
│   │   └── ui/          # Low-level UI primitives
│   └── ...
├── server/              # Express Backend
│   ├── src/
│   │   ├── config/      # DB & Env Config
│   │   ├── controllers/ # Request Handlers
│   │   ├── middleware/  # Auth & Error Handling
│   │   ├── models/      # Mongoose Schemas (User, Product, Order)
│   │   ├── routes/      # API Endpoints
│   │   ├── utils/       # JWT Generation & Validation
│   │   └── app.js       # App Entry Point
│   ├── seeder.js        # Data Generation Script
│   └── ...
└── ...
```

## 🔐 Key Features

- **Role-Based Access Control (RBAC):**
  - **Farmers:** Manage inventory, view incoming orders, update fulfillment status.
  - **Buyers:** Procurement dashboard, spending analytics, embedded sourcing hub.
- **Secure Authentication:** HttpOnly Cookie-based JWT auth preventing XSS.
- **Smart Fallbacks:** Robust image handling and error boundaries.
- **Strict Validation:** All incoming data is validated with Zod before touching the DB.

---

## 🛠 Development Notes

- **API Documentation:** The backend routes are structured in `server/src/routes`.
- **Linting:** The client uses ESLint. Run `npm run lint` in `/client` to check code quality.
- **Testing:** Currently manual. Automated tests are planned for Phase 5.