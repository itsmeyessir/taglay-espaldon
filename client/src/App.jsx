import './index.css';
import { lazy, Suspense, memo } from 'react';
import { 
  createBrowserRouter, 
  RouterProvider, 
  Outlet, 
  useLocation 
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { SidebarProvider } from './contexts/SidebarContext';
import { MotionProvider } from './contexts/MotionContext';
import { AuthProvider } from './contexts/AuthContext'; // Import AuthProvider
import { useEffect } from 'react';
import PageLoader from './components/PageLoader';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

// Lazy load all pages for code splitting
// This reduces initial bundle size significantly
const LandingPage = lazy(() => import('./pages/LandingPage'));
const MarketplacePage = lazy(() => import('./pages/MarketplacePage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const OrdersPage = lazy(() => import('./pages/dashboard/OrdersPage'));
const ProductsPage = lazy(() => import('./pages/dashboard/ProductsPage'));
const AnalyticsPage = lazy(() => import('./pages/dashboard/AnalyticsPage'));
const SettingsPage = lazy(() => import('./pages/dashboard/SettingsPage'));
const SourcingPage = lazy(() => import('./pages/dashboard/SourcingPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const NewNotFoundPage = lazy(() => import('./pages/NewNotFoundPage'));

// Scroll to top on route change - memoized for performance
const ScrollToTop = memo(function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Use requestAnimationFrame for smoother scroll
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  }, [pathname]);
  
  return null;
});

// Suspense wrapper for lazy-loaded pages
function SuspenseWrapper({ children }) {
  return (
    <Suspense fallback={<PageLoader />}>
      {children}
    </Suspense>
  );
}

import ErrorBoundary from './components/ErrorBoundary';

// Root layout with scroll to top and page transitions
function RootLayout() {
  const location = useLocation();
  
  return (
    <ErrorBoundary>
      <AuthProvider> {/* AuthProvider must be inside Router context */}
        <ScrollToTop />
        <AnimatePresence mode="wait" initial={false}>
          <SuspenseWrapper key={location.pathname}>
            <Outlet />
          </SuspenseWrapper>
        </AnimatePresence>
      </AuthProvider>
    </ErrorBoundary>
  );
}

// Dashboard layout wrapper with SidebarProvider
function DashboardWrapper() {
  return (
    <SidebarProvider>
      <Outlet />
    </SidebarProvider>
  );
}

const routes = [
  {
    element: <RootLayout />,
    errorElement: (
      <SuspenseWrapper>
        <NewNotFoundPage />
      </SuspenseWrapper>
    ),
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/marketplace',
        element: <MarketplacePage />,
      },
      {
        path: '/marketplace/:productId',
        element: <ProductDetailPage />,
      },
      {
        path: '/dashboard',
        element: <ProtectedRoute />, // Protect the entire dashboard segment
        children: [
          {
            element: <DashboardWrapper />, // DashboardWrapper is now an element for the protected route
            children: [
              {
                index: true,
                element: <DashboardPage />,
              },
              {
                path: 'orders',
                element: <OrdersPage />,
              },
              {
                path: 'sourcing', // Buyer's Marketplace
                element: <ProtectedRoute allowedRoles={['buyer']}><SourcingPage /></ProtectedRoute>,
              },
              {
                path: 'products', // This page should be for farmers/admins
                element: <ProtectedRoute allowedRoles={['farmer', 'admin']}><ProductsPage /></ProtectedRoute>,
              },
              {
                path: 'invoices', // Assuming invoices are like analytics, for admins
                element: <ProtectedRoute allowedRoles={['admin']}><AnalyticsPage /></ProtectedRoute>,
              },
              {
                path: 'analytics', // Admins, Farmers, and Buyers
                element: <ProtectedRoute allowedRoles={['admin', 'farmer', 'buyer']}><AnalyticsPage /></ProtectedRoute>,
              },
              {
                path: 'settings',
                element: <SettingsPage />,
              },
            ],
          },
        ],
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/contact',
        element: <ContactPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '*',
        element: <NewNotFoundPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <MotionProvider>
      <RouterProvider router={router} />
    </MotionProvider>
  );
}

export default App;
