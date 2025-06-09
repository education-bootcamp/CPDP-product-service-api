const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../config/aws');
const path = require('path');

// File filter for security
const fileFilter = (req, file, cb) => {
    // Allow only specific image types
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, JPG, GIF, and WebP are allowed.'), false);
    }
};

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME || 'test-dev-upload-devstack',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, {
                fileName: file.originalname,
                uploadedAt: new Date().toISOString()
            });
        },
        key: function (req, file, cb) {
            // Generate unique filename with timestamp and random string
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const fileExtension = path.extname(file.originalname);
            const fileName = `products/${uniqueSuffix}${fileExtension}`;
            cb(null, fileName);
        }
    }),
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

module.exports = upload;