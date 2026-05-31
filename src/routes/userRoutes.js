const express = require('express');
const {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Debug: Check if all functions are imported correctly
console.log('User Controller Functions:', {
    getUsers: typeof getUsers,
    createUser: typeof createUser,
    getUser: typeof getUser,
    updateUser: typeof updateUser,
    deleteUser: typeof deleteUser
});

// Protect all routes after this middleware
router.use(protect);

// Admin only routes
router.route('/')
    .get(authorize('admin'), getUsers)
    .post(authorize('admin'), createUser);

router.route('/:id')
    .get(authorize('admin'), getUser)
    .put(authorize('admin'), updateUser)
    .delete(authorize('admin'), deleteUser);

module.exports = router;