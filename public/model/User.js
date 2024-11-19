const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
      type: String,
     
  },
  email: {
      type: String,
      
      unique: true
  },
  password: {
      type: String,
       // Password is required during creation
      minlength: 6
  },
  Image: {
      type: String
  }
});

// Create the model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;