import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable automatic JSX runtime for smaller bundle
      jsxRuntime: 'automatic',
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        // Remove console logs in production
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks - these change less frequently
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'framer-motion': ['framer-motion'],
          'icons': ['lucide-react'],
        },
      },
    },
    // Generate source maps for debugging (optional in prod)
    sourcemap: false,
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 600,
  },
  // Optimize dev server
  server: {
    // Enable HMR
    hmr: true,
    // Pre-bundle dependencies for faster dev startup
    warmup: {
      clientFiles: [
        './src/App.jsx',
        './src/pages/LandingPage.jsx',
        './src/components/**/*.jsx',
      ],
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5001',
        changeOrigin: true,
        secure: false, // Set to true if your backend uses HTTPS
      },
    },
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react',
      'clsx',
      'tailwind-merge',
    ],
  },
})
