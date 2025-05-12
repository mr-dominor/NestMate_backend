import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
    trim: true
  },
  serviceType: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  unit: {
    type: String, // e.g. "per hour", "per visit", etc.
    required: true
  },
  turns: {
    type: Number, // Optional: if service is based on number of uses
    default: null
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true
  },
  reputation: {
    type: Number, // Optional: rating for this specific service
    default: 0
  },
  contact: {
    type: String, // Optional: service-specific contact, fallback to vendor's contact
    default: null
  },
  available: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Services = mongoose.model("services",serviceSchema);
export {Services};
