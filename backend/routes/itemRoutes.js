const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes require authentication
router.use(authMiddleware);

// GET /api/items - Get all items for current user
router.get('/', itemController.getAllItems);

// GET /api/items/:id - Get single item
router.get('/:id', itemController.getItem);

// POST /api/items - Create new item
router.post('/', itemController.createItem);

// PUT /api/items/:id - Update item
router.put('/:id', itemController.updateItem);

// DELETE /api/items/:id - Delete item
router.delete('/:id', itemController.deleteItem);

module.exports = router;
