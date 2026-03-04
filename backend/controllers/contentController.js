const Content = require('../models/Content');

// @desc    Get all content / search / filter
// @route   GET /api/content
// @access  Public
const getContent = async (req, res) => {
    const { subject, difficulty, type, search } = req.query;
    let query = {};

    if (subject) query.subject = subject;
    if (difficulty) query.difficulty = difficulty;
    if (type) query.type = type;
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { tags: { $in: [new RegExp(search, 'i')] } }
        ];
    }

    const content = await Content.find(query).sort({ createdAt: -1 });
    res.json(content);
};

// @desc    Get single content
// @route   GET /api/content/:id
// @access  Public
const getContentById = async (req, res) => {
    const content = await Content.findById(req.params.id);

    if (content) {
        res.json(content);
    } else {
        res.status(404);
        throw new Error('Content not found');
    }
};

// @desc    Create content
// @route   POST /api/content
// @access  Private/Admin
const createContent = async (req, res) => {
    const { title, subject, type, difficulty, tags, contentUrl, description, coverImage } = req.body;

    const content = new Content({
        title,
        subject,
        type,
        difficulty,
        tags,
        contentUrl,
        coverImage: coverImage || '',
        description,
        createdBy: req.user._id
    });

    const createdContent = await content.save();
    res.status(201).json(createdContent);
};

// @desc    Update content
// @route   PUT /api/content/:id
// @access  Private/Admin
const updateContent = async (req, res) => {
    const content = await Content.findById(req.params.id);

    if (content) {
        content.title = req.body.title || content.title;
        content.subject = req.body.subject || content.subject;
        content.type = req.body.type || content.type;
        content.difficulty = req.body.difficulty || content.difficulty;
        content.tags = req.body.tags || content.tags;
        content.contentUrl = req.body.contentUrl || content.contentUrl;
        content.coverImage = req.body.coverImage !== undefined ? req.body.coverImage : content.coverImage;
        content.description = req.body.description || content.description;

        const updatedContent = await content.save();
        res.json(updatedContent);
    } else {
        res.status(404);
        throw new Error('Content not found');
    }
};

// @desc    Delete content
// @route   DELETE /api/content/:id
// @access  Private/Admin
const deleteContent = async (req, res) => {
    const content = await Content.findById(req.params.id);

    if (content) {
        await content.deleteOne();
        res.json({ message: 'Content removed' });
    } else {
        res.status(404);
        throw new Error('Content not found');
    }
};

module.exports = {
    getContent,
    getContentById,
    createContent,
    updateContent,
    deleteContent
};
