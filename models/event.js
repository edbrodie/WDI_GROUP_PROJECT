const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  bandName: { type: String, trim: true, required: true },
  image: { type: String, trim: true, required: true },
  location: { type: String, trim: true, required: true },
  locationName: { type: String, trim: true, required: true },
  description: { type: String, trim: true, required: true },
  price: { type: String, trim: true, required: true }
});

module.exports = mongoose.model('Event', eventSchema);
