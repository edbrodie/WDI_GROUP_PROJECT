const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

commentSchema.methods.belongsTo = function commentsBelongsTo(User) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === User.id;
  return User.id === this.createdBy.toString();
};


const eventSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  bandName: { type: String, trim: true },
  image: { type: String, trim: true },
  location: { type: String, trim: true },
  locationName: { type: String, trim: true },
  latlon: { type: String, trim: true },
  description: { type: String, trim: true },
  price: { type: String, trim: true },
  comments: [ commentSchema ]
});

module.exports = mongoose.model('Event', eventSchema);
