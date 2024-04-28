const express = require('express');
const router = express.Router();
const furnitureController = require('../controllers/furnitureController');

router.post('/', furnitureController.createFurniture);
router.get('/', furnitureController.getAllFurniture);
router.get('/:id', furnitureController.getFurnitureById);
router.put('/:id', furnitureController.updateFurniture);
router.delete('/:id', furnitureController.deleteFurniture);

module.exports = router;