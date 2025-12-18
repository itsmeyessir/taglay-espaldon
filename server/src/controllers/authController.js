const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { registerSchema, loginSchema } = require('../utils/validation');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    // 1. Validate Input with Zod
    const validation = registerSchema.safeParse(req.body);
    
    if (!validation.success) {
      res.status(400);
      throw new Error(validation.error.errors[0].message);
    }

    const { name, organizationName, email, password, phone, address, role } = validation.data;

    // 2. Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    // 3. Create User
    const user = await User.create({
      name,
      organizationName,
      email,
      phone,
      address,
      password,
      role
    });

    if (user) {
      // 4. Generate Token (HttpOnly Cookie)
      generateToken(res, user._id);

      res.status(201).json({
        _id: user._id,
        name: user.name,
        organizationName: user.organizationName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    next(error); // Pass to error handler middleware
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    // 1. Validate Input
    const validation = loginSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400);
      throw new Error(validation.error.errors[0].message);
    }

    const { email, password, rememberMe } = validation.data;

    // 2. Find User
    const user = await User.findOne({ email }).select('+password'); // Explicitly include password for checking

    if (user && (await user.matchPassword(password))) {
      // 3. Generate Token
      generateToken(res, user._id, rememberMe);

      res.json({
        _id: user._id,
        name: user.name,
        organizationName: user.organizationName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
const getUserProfile = async (req, res, next) => {
  try {
    const user = {
      _id: req.user._id,
      name: req.user.name,
      organizationName: req.user.organizationName,
      email: req.user.email,
      phone: req.user.phone,
      address: req.user.address,
      role: req.user.role,
    };

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
};
