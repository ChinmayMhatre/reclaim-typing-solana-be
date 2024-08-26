const express = require('express');
const { loginOrRegisterUser, addPoints, getLeaderboard } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/login/:walletAddress', loginOrRegisterUser);
router.post('/add-points', protect, addPoints);
router.get('/leaderboard', getLeaderboard);

module.exports = router;