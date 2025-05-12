import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    match: /^[6-9]\d{9}$/  // Example: Indian mobile format
  },
  email: {
    type: String,
    required: false,
    match: /.+\@.+\..+/
  },
  address: {
    type: String,
    required: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  registeredAt: {
    type: Date,
    default: Date.now
  },
  addedByAdminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'admin',
    required: true
  },
  documents: [
    {
      type: String // links or filenames of uploaded verification docs
    }
  ],
  status: {
    type: String,
    enum: ['ACTIVE', 'SUSPENDED', 'BANNED'],
    default: 'ACTIVE'
  }
},{timestamps:true});

const Vendors = mongoose.model("vendors",vendorSchema);
export {Vendors};