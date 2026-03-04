const mongoose = require('mongoose');

const interactionSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    contentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content',
        required: true
    },
    type: {
        type: String,
        enum: ['view', 'complete', 'bookmark'],
        required: true
    },
    duration: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Interaction = mongoose.model('Interaction', interactionSchema);
module.exports = Interaction;
