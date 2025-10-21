import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    product: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        default: "",
      },
    },
    customer: {
      fullName: {
        type: String,
        required: true,
      },
      primaryNumber: {
        type: String,
        required: true,
      },
      secondaryNumber: {
        type: String,
        default: "",
      },
      address: {
        type: String,
        required: true,
      },
      landmark: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
