const express = require('express');
const ProductController = require('../controller/ProductController');
const upload=require('../config/upload');

const router = express.Router();

// Error handling middleware for multer
const handleMulterError = (error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                code: 400,
                message: 'File size too large. Maximum size is 5MB.'
            });
        }
    }

    if (error.message.includes('Invalid file type')) {
        return res.status(400).json({
            code: 400,
            message: error.message
        });
    }

    next(error);
};



router.post('/create-product',
    upload.single('file'),
    handleMulterError,
    ProductController.createProduct
);
router.put('/update-product/:id', ProductController.updateProduct);
router.delete('/delete-product/:id', ProductController.deleteProduct);
router.get('/find-product-by-id/:id', ProductController.findProductById);
router.get('/find-all-products', ProductController.findAllProducts);

module.exports = router;