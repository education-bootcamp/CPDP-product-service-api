const express = require('express');
const CategoryController = require('../controller/CategoryController');

const router = express.Router();

router.post('/create-category', CategoryController.createCategory);
router.put('/update-category/:id', CategoryController.updateCategory);
router.delete('/delete-category/:id', CategoryController.deleteCategory);
router.get('/find-category-by-id/:id', CategoryController.findCategoryById);
router.get('/find-all-categories', CategoryController.findAllCategories);

module.exports = router;