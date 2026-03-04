const Interaction = require('../models/Interaction');
const User = require('../models/User');
const Content = require('../models/Content');

// @desc    Log a user interaction (view/complete)
// @route   POST /api/interactions
// @access  Private
const logInteraction = async (req, res) => {
    const { contentId, type, duration } = req.body;

    const interaction = await Interaction.create({
        userId: req.user._id,
        contentId,
        type,
        duration: duration || 0
    });

    if (type === 'complete') {
        await User.findByIdAndUpdate(req.user._id, {
            $addToSet: { completedContent: contentId }
        });
    }

    if (type === 'view') {
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                recentViews: {
                    $each: [{ contentId, date: new Date() }],
                    $slice: -10 // Keep only last 10
                }
            }
        });
        await Content.findByIdAndUpdate(contentId, { $inc: { viewCount: 1 } });
    }

    res.status(201).json(interaction);
};

module.exports = { logInteraction };
