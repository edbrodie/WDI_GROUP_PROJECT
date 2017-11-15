const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const memberSchema = mongoose.Schema({
  name: { type: String, unique: true},
  email: { type: String, unique: true},
  username: { type: String, unique: true},
  passwordHash: { type: String },
  githubId: { type: Number }
});

memberSchema
  .virtual('password')
  .set(setPassword);

memberSchema
  .virtual('passwordConfirmation')
  .set(setPasswordConfirmation);

memberSchema
  .path('passwordHash')
  .validate(validatePasswordHash);

memberSchema
  .path('email')
  .validate(validateEmail);


memberSchema.methods.validatePassword = validatePassword;

memberSchema.set('toJSON', {
  virtuals: true,
  getters: true,
  setters: true,
  transform: function(doc, ret) {
    delete ret.passwordHash;
    delete ret.password;
    delete ret.passwordConfirmation;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

// if(!this.password && !this.githubId)


function setPassword(value){
  this._password    = value;
  this.passwordHash = bcrypt.hashSync(value, bcrypt.genSaltSync(8));
}

function setPasswordConfirmation(passwordConfirmation) {
  this._passwordConfirmation = passwordConfirmation;
}

function validatePasswordHash() {
  if (this.isNew) {
    if (!this._password) {
      return this.invalidate('password', 'A password is required.');
    }

    if (this._password.length < 6) {
      this.invalidate('password', 'must be at least 6 characters.');
    }

    if (this._password !== this._passwordConfirmation) {
      return this.invalidate('passwordConfirmation', 'Passwords do not match.');
    }
  }
}

function validateEmail(email) {
  if (!validator.isEmail(email)) {
    return this.invalidate('email', 'must be a valid email address');
  }
}

function validatePassword(password){
  return bcrypt.compareSync(password, this.passwordHash);
}

module.exports = mongoose.model('Member', memberSchema);
