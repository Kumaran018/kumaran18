const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            interests: user.interests,
            skillLevel: user.skillLevel,
            learningGoals: user.learningGoals,
            completedContent: user.completedContent,
            quizScores: user.quizScores
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.interests = req.body.interests || user.interests;
        user.skillLevel = req.body.skillLevel || user.skillLevel;
        user.learningGoals = req.body.learningGoals || user.learningGoals;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            token: null, // Token not updated here usually
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

module.exports = { getUserProfile, updateUserProfile };
