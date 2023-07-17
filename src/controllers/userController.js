const User = require('../models/userModel');
// You may also require other modules or dependencies as needed

// GET /users
 exports.getUsers = (req, res) => {
  // Fetch users from the database
    const users = User.find();
  // Send the users as a response
    res.json(users);
  };
  
  // POST /users
  exports.createUser = (req, res) => {
  // Extract user data from the request body
    const { name, email, password } = req.body;
    
  // Create a new user instance
    const newUser = new User({
      name,
      email,
      password
    });
  
  // Save the user to the database
    newUser.save();
  
  // Send a success response
    res.json({ message: 'User created successfully' });
  };
  