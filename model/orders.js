const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  pickupTime: { type: String },
  pickupDate: { type: String },
  customerId: { type: String },
  status: { type: String, default: "pending" },
  transactionId: { type: String, default: "-" },
  totalAmount: { type: Number, required: true },
  date: { type: String, default: new Date() },
  managerId: { type: String, required: true },
});

module.exports = mongoose.model("orders", ordersSchema);
