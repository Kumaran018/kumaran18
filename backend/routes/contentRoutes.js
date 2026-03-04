const express = require('express');
const router = express.Router();
const {
    getContent,
    getContentById,
    createContent,
    updateContent,
    deleteContent
} = require('../controllers/contentController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getContent)
    .post(protect, admin, createContent);

router.route('/:id')
    .get(getContentById)
    .put(protect, admin, updateContent)
    .delete(protect, admin, deleteContent);

module.exports = router;
