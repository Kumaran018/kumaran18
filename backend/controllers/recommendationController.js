const User = require('../models/User');
const { getRecommendations } = require('../services/recommendationService');

// @desc    Get personalized recommendations
// @route   GET /api/recommendations
// @access  Private
const getUserRecommendations = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        const recommendations = await getRecommendations(user);
        res.json(recommendations);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

module.exports = { getUserRecommendations };
