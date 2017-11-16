const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'Member' }
  },
  {
    timestamps: true
  }
);

commentSchema.methods.belongsTo = function commentsBelongsTo(member) {
  if (typeof this.createdBy.id === 'string')
    return this.createdBy.id === member.id;
  return member.id === this.createdBy.toString();
};

const eventSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'Member' },
  bandName: { type: String, trim: true },
  image: { type: String, trim: true },
  location: { type: String, trim: true },
  locationName: { type: String, trim: true },
  latlon: { type: String, trim: true },
  description: { type: String, trim: true },
  price: { type: String, trim: true },
  comments: [commentSchema]
});

module.exports = mongoose.model('Event', eventSchema);
