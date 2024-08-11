// backend/models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

// Define the User
const UserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    username: { 
        type: String, 
        required: true, 
        unique: true },
    password: { 
        type: String, 
        required: true 
    },
    favorites: [
        {
            bookId: String,
            title: String,
            subtitle: String,
            publisher: String,
            authors: [String],
            thumbnail: String,
            description: String, 
        }
    ],
});

// Pre-save middleware to hash the password before saving it.
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
      return next(); // If the password is not modified, move to the next middleware.
    }
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR); // Generate a salt.
    this.password = await bcrypt.hash(this.password, salt); // Hash the password.
    next(); // Move to the next middleware.
  });

// Method to compare the candidate password with the hashed password.
UserSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };

// Create and export the User model.
const User = mongoose.model('User', UserSchema);
module.exports = User;
