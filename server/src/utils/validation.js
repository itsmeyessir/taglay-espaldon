const { z } = require('zod');

// Schema for user registration
const registerSchema = z.object({
  name: z.string().min(3, 'Contact name must be at least 3 characters long'),
  organizationName: z.string().min(3, 'Organization name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    province: z.string().min(1, 'Province is required'),
    zip: z.string().optional()
  }).optional(),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  role: z.enum(['buyer', 'farmer', 'admin']).default('buyer').optional(), // Optional, default to buyer
});

// Schema for user login
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  rememberMe: z.boolean().optional(),
});

// Schema for product creation
const productSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title cannot exceed 100 characters'),
  description: z.string().min(1, 'Description is required').max(500, 'Description cannot exceed 500 characters'),
  price: z.number().min(0, 'Price cannot be negative'),
  category: z.enum([
    'fruits',
    'vegetables',
    'grains',
    'dairy',
    'meat',
    'seafood',
    'spices',
    'coffee',
    'cacao',
    'textile',
    'others'
  ], { message: 'Invalid category' }),
  images: z.array(z.object({ url: z.string().url('Invalid image URL') })).optional(),
  stock: z.number().int().min(0, 'Stock cannot be negative'),
  unit: z.string().min(1, 'Unit is required').max(20, 'Unit cannot exceed 20 characters'),
});

// Schema for product update (all fields optional)
const productUpdateSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().min(1).max(500).optional(),
  price: z.number().min(0).optional(),
  category: z.enum([
    'fruits',
    'vegetables',
    'grains',
    'dairy',
    'meat',
    'seafood',
    'spices',
    'others'
  ]).optional(),
  images: z.array(z.object({ url: z.string().url() })).optional(),
  stock: z.number().int().min(0).optional(),
  unit: z.string().min(1).max(20).optional(),
}).partial(); // Makes all fields optional

// Schema for order creation
const orderSchema = z.object({
  items: z.array(z.object({
    productId: z.string().min(1, 'Product ID is required'),
    title: z.string().min(1, 'Product title is required'),
    quantity: z.number().int().min(1, 'Quantity must be at least 1'),
    price: z.number().min(0, 'Price must be non-negative'),
    image: z.string().optional()
  })).min(1, 'Order must contain at least one item'),
  shippingAddress: z.object({
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
    country: z.string().min(1, 'Country is required')
  }),
  paymentMethod: z.string().min(1, 'Payment method is required'),
  taxPrice: z.number().min(0).optional(),
  shippingPrice: z.number().min(0).optional(),
  totalPrice: z.number().min(0, 'Total price is required'),
});

module.exports = {
  registerSchema,
  loginSchema,
  productSchema,
  productUpdateSchema,
  orderSchema,
};
