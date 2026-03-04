const mongoose = require('mongoose');

const bookmarkSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    contentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content',
        required: true
    }
}, {
    timestamps: true
});

// Ensure unique combination of user and content
bookmarkSchema.index({ userId: 1, contentId: 1 }, { unique: true });

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
module.exports = Bookmark;
