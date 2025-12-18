const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // References the User model
  },
  title: {
    type: String,
    required: [true, 'Please add a product title'],
    trim: true,
    maxlength: [100, 'Title can not be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description can not be more than 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Please specify a category'],
    enum: [
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
      'handicrafts',
      'others'
    ]
  },
  images: [
    {
      url: {
        type: String,
        default: 'no-photo.jpg' // Placeholder or default image
      }
    }
  ],
  stock: {
    type: Number,
    required: [true, 'Please add stock quantity'],
    min: [0, 'Stock cannot be negative']
  },
  unit: {
    type: String,
    required: [true, 'Please specify a unit (e.g., kg, sack, piece)'],
    trim: true,
    maxlength: [20, 'Unit can not be more than 20 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('Product', productSchema);
