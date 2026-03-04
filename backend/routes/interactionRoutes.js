const express = require('express');
const router = express.Router();
const { logInteraction } = require('../controllers/interactionController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, logInteraction);

module.exports = router;
