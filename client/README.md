# Taglay Client (Frontend)

The frontend application for **Taglay**, built with **React 19**, **Vite**, and **Tailwind CSS**. It serves as the user interface for Farmers and Buyers, providing rich dashboards, a marketplace, and order management tools.

---

## 🛠 Tech Stack

- **Framework:** React 19 + Vite
- **Language:** JavaScript (ESNext)
- **Styling:** Tailwind CSS v4 + DaisyUI v5
- **State Management:** TanStack Query (Server State) + React Context (Client State)
- **Routing:** React Router DOM v7
- **HTTP Client:** Axios
- **Icons:** Lucide React

---

## 🚀 Setup & Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file in the root of the `client` directory:

```env
# URL of the Taglay Express Backend
VITE_API_URL=http://localhost:5000/api
```

### 3. Run Development Server
```bash
npm run dev
```
The app will open at `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```
This generates optimized static assets in the `dist/` folder.

---

## 📂 Directory Structure

```text
src/
├── assets/         # Static assets (images, SVGs)
├── components/     # High-level business components
│   ├── dashboard/  # Dashboard-specific widgets (Charts, Tables)
│   ├── marketplace/# Marketplace grid and filters
│   └── ui/         # Low-level UI primitives (Button, Input, Badge)
├── contexts/       # Global Providers
│   ├── AuthContext.jsx   # Authentication state & methods
│   └── SidebarContext.jsx # Dashboard sidebar state
├── hooks/          # Custom React Hooks
│   ├── useOrders.js      # Order fetching/mutating logic (React Query)
│   ├── useProducts.js    # Product fetching logic
│   └── useDashboard.js   # Analytics data hooks
├── lib/            # Utilities
│   ├── axios.js    # Configured Axios instance (interceptors)
│   └── utils.js    # Helper functions (CN, formatting)
├── pages/          # Page views (correspond to Routes)
└── styles/         # Global styles & specific CSS overrides
```

---

## 🧩 Key Concepts

### Data Fetching (TanStack Query)
We avoid `useEffect` for data fetching. Instead, we use custom hooks wrapping React Query:
- **`useProducts`**: Fetches marketplace listings.
- **`useOrders`**: Fetches order history and stats.
- **`useDashboard`**: Fetches role-specific analytics.

Example:
```javascript
const { data: products, isLoading } = useProducts({ category: 'coffee' });
```

### Authentication
Auth is handled via `AuthContext`. It checks for an existing session on mount (via `/api/auth/me`) and manages Login/Register/Logout methods. Tokens are stored in **HttpOnly Cookies**, so the frontend does not manage JWT storage directly.

### Styling System
- **Tailwind v4:** Utility-first styling.
- **DaisyUI:** Provides component classes (e.g., `btn`, `card`).
- **Aceternity UI:** Used for high-impact visuals (Bento Grids, Moving Cards).

---

## ⚠️ Common Issues

**Images not loading?**
- Ensure the backend `seeder.js` was run recently to provide fresh, valid Unsplash URLs.
- The `ProductCard` component has a built-in fallback to `images/placeholder.jpg` if an image fails.

**CORS Errors?**
- Ensure `server/.env` has `CLIENT_URL=http://localhost:5173`.
- Ensure you are accessing the frontend via the same URL defined in the server config.