const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  bandName: { type: String, trim: true },
  image: { type: String, trim: true },
  location: { type: String, trim: true },
  locationName: { type: String, trim: true },
  description: { type: String, trim: true },
  price: { type: String, trim: true }
});

module.exports = mongoose.model('Event', eventSchema);
