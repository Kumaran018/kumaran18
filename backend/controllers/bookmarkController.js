const Bookmark = require('../models/Bookmark');

// @desc    Get user bookmarks
// @route   GET /api/bookmarks
// @access  Private
const getBookmarks = async (req, res) => {
    const bookmarks = await Bookmark.find({ userId: req.user._id }).populate('contentId');
    res.json(bookmarks);
};

// @desc    Add a bookmark
// @route   POST /api/bookmarks/:contentId
// @access  Private
const addBookmark = async (req, res) => {
    const bookmark = await Bookmark.create({
        userId: req.user._id,
        contentId: req.params.contentId
    });

    res.status(201).json(bookmark);
};

// @desc    Remove a bookmark
// @route   DELETE /api/bookmarks/:contentId
// @access  Private
const removeBookmark = async (req, res) => {
    const bookmark = await Bookmark.findOne({
        userId: req.user._id,
        contentId: req.params.contentId
    });

    if (bookmark) {
        await bookmark.deleteOne();
        res.json({ message: 'Bookmark removed' });
    } else {
        res.status(404);
        throw new Error('Bookmark not found');
    }
};

module.exports = { getBookmarks, addBookmark, removeBookmark };
