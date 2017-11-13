const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'Member', required: true }
}, {
  timestamps: true
});

commentSchema.methods.belongsTo = function commentsBelongsTo(member) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === member.id;
  return member.id === this.createdBy.toString();
};


const eventSchema = new mongoose.Schema({
  bandName: { type: String, trim: true },
  image: { type: String, trim: true },
  location: { type: String, trim: true },
  price: { type: String, trim: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'Member' },
  comments: [ commentSchema ]
});

module.exports = mongoose.model('Event', eventSchema);
