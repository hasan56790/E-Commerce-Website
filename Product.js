const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  category: {
    type: String,
    required: true,
    enum: ['Oud', 'Musk', 'Rose', 'Amber', 'Gold', 'Leather', 'Limited Edition']
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 10
  },
  fragranceNotes: {
    top: [String],
    heart: [String],
    base: [String]
  },
  lastingTime: {
    type: String,
    required: true
  },
  bestseller: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  limitedEdition: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: [{
    user: String,
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);