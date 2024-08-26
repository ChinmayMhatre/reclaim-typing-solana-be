const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Login or Register User
const loginOrRegisterUser = async (req, res) => {
  const { walletAddress } = req.params;
  console.log(req.params);
  

  try {
    let user = await User.findOne({ walletAddress });

    if (!user) {
      // Create new user
      user = await User.create({ walletAddress });
    }

    const token = generateToken(user._id);
    res.json({ walletAddress: user.walletAddress, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' , error: error.message , body: req.query});
  }
};

// Add points to user
const addPoints = async (req, res) => {
  const { points } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.points += points;
    await user.save();

    res.json({ message: 'Points added', points: user.points });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get leaderboard
const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find().sort({ points: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  loginOrRegisterUser,
  addPoints,
  getLeaderboard,
};
