import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes for common queries
productSchema.index({ vendor: 1 });
productSchema.index({ name: 'text' });

export default mongoose.model('Product', productSchema);