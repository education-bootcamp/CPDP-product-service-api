const express = require('express');
const ProductController = require('../controller/ProductController');
const upload=require('../config/upload');

const router = express.Router();

router.post('/create-product', upload.single('file'), ProductController.createProduct);
router.put('/update-product/:id', ProductController.updateProduct);
router.delete('/delete-product/:id', ProductController.deleteProduct);
router.get('/find-product-by-id/:id', ProductController.findProductById);
router.get('/find-all-products', ProductController.findAllProducts);

module.exports = router;