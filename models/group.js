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


const groupSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  eventId: { type: String, trim: true },
  attendees: [{ type: mongoose.Schema.ObjectId, ref: 'Member' }],
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'Member' },
  image: { type: String, trim: true },
  description: { type: String, trim: true },
  comments: [ commentSchema ]
});

module.exports = mongoose.model('Group', groupSchema);
