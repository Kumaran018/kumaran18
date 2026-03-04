const Interaction = require('../models/Interaction');
const User = require('../models/User');
const Content = require('../models/Content');

// @desc    Get current user analytics
// @route   GET /api/analytics/me
// @access  Private
const getMyAnalytics = async (req, res) => {
    const userId = req.user._id;

    const totalInteractions = await Interaction.countDocuments({ userId });
    const completedCount = await Interaction.countDocuments({ userId, type: 'complete' });
    const bookmarkCount = await Interaction.countDocuments({ userId, type: 'bookmark' });

    // Progress by subject
    const completed = await Interaction.find({ userId, type: 'complete' }).populate('contentId');
    const subjectProgress = {};

    completed.forEach(item => {
        if (item.contentId) {
            const subject = item.contentId.subject;
            subjectProgress[subject] = (subjectProgress[subject] || 0) + 1;
        }
    });

    res.json({
        totalInteractions,
        completedCount,
        bookmarkCount,
        subjectProgress
    });
};

// @desc    Get admin platform analytics
// @route   GET /api/analytics/admin
// @access  Private/Admin
const getAdminAnalytics = async (req, res) => {
    const userCount = await User.countDocuments({ role: 'student' });
    const contentCount = await Content.countDocuments();
    const interactionCount = await Interaction.countDocuments();

    // Top subjects
    const subjects = await Content.aggregate([
        { $group: { _id: '$subject', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
    ]);

    // Popular content
    const popularContent = await Content.find().sort({ viewCount: -1 }).limit(5);

    res.json({
        userCount,
        contentCount,
        interactionCount,
        subjects,
        popularContent
    });
};

module.exports = { getMyAnalytics, getAdminAnalytics };
