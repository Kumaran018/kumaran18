const express = require('express');
const router = express.Router();
console.log('Admin Routes Loaded');
const {
    getAllUsers,
    updateUserRole,
    getPlatformStats,
    aiResourceAgent
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/users/list', protect, admin, getAllUsers);
router.patch('/users/:id/role', protect, admin, updateUserRole);
router.get('/stats', protect, admin, getPlatformStats);
router.post('/agent/collect', protect, aiResourceAgent); // Allow mods to use agent too

module.exports = router;
