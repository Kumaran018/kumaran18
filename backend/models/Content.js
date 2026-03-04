const mongoose = require('mongoose');

const contentSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['video', 'pdf', 'quiz', 'article', 'coding'],
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true
    },
    tags: [{
        type: String
    }],
    contentUrl: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    rating: {
        type: Number,
        default: 0
    },
    viewCount: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Content = mongoose.model('Content', contentSchema);
module.exports = Content;
