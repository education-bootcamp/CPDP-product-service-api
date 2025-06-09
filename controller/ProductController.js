const ProductSchema = require('../model/ProductSchema');
// save (POST)
const createProduct = async (request, response) => {
    try {
        const {
            productName,
            actualPrice,
            oldPrice,
            qty,
            description,
            discount,
            categoryId
        } = request.body;

        // Validation
        if (!productName || !actualPrice || !oldPrice || !qty || !description || !discount || !categoryId) {
            return response.status(400).json({
                code: 400,
                message: 'Missing required fields: productName, actualPrice, oldPrice, qty, description, discount, categoryId',
                data: null
            });
        }

        // Check if file was uploaded
        if (!request.file) {
            return response.status(400).json({
                code: 400,
                message: 'Product image is required',
                data: null
            });
        }

        // Validate numeric fields
        if (isNaN(actualPrice) || isNaN(oldPrice) || isNaN(qty) || isNaN(discount)) {
            return response.status(400).json({
                code: 400,
                message: 'Price, quantity, and discount must be valid numbers',
                data: null
            });
        }

        const fileData = request.file;

        const product = new ProductSchema({
            productName: productName.trim(),
            images: [
                {
                    hash: generateFileHash(fileData), // You'll need to implement this function
                    resourceUrl: fileData.location,
                    fileName: fileData.originalname,
                    directory: fileData.key,
                    size: fileData.size,
                    mimeType: fileData.mimetype
                }
            ],
            actualPrice: parseFloat(actualPrice),
            oldPrice: parseFloat(oldPrice),
            qty: parseInt(qty),
            description: description.trim(),
            discount: parseFloat(discount),
            categoryId: categoryId,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const saveData = await product.save();

        return response.status(201).json({
            code: 201,
            message: 'Product has been created successfully',
            data: {
                id: saveData._id,
                productName: saveData.productName,
                images: saveData.images,
                actualPrice: saveData.actualPrice,
                oldPrice: saveData.oldPrice,
                qty: saveData.qty,
                description: saveData.description,
                discount: saveData.discount,
                categoryId: saveData.categoryId,
                createdAt: saveData.createdAt
            }
        });

    } catch (error) {
        console.error('Error creating product:', error);

        // Handle specific errors
        if (error.name === 'ValidationError') {
            return response.status(400).json({
                code: 400,
                message: 'Validation error',
                errors: Object.values(error.errors).map(e => e.message)
            });
        }

        if (error.code === 11000) {
            return response.status(409).json({
                code: 409,
                message: 'Product with this name already exists'
            });
        }

        return response.status(500).json({
            code: 500,
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
// update (PUT)
const updateProduct = async (request, response) => {
    try {
        const {productName, actualPrice, oldPrice, qty, description, discount, categoryId} = request.body;
        if (!productName || !actualPrice || !oldPrice || !qty || !description || !discount || !categoryId) {
            return response.status(400).json({code: 400, message: 'some fields are missing!..', data: null});
        }

        const updateData = await ProductSchema.findOneAndUpdate({'_id': request.params.id}, {
            $set: {
                productName: productName,
                actualPrice: actualPrice,
                oldPrice: oldPrice,
                qty: qty,
                description: description,
                discount: discount,
                categoryId: categoryId
            }
        }, {new: true});
        return response.status(200).json({code: 200, message: 'product has been updated...', data: updateData});
    } catch (e) {
        response.status(500).json({code: 500, message: 'something went wrong...', error: e});
    }
}
// delete (DELETE)
const deleteProduct = async (request, response) => {
    try {
        if (!request.params.id) {
            return response.status(400).json({code: 400, message: 'some fields are missing!..', data: null});
        }
        const deletedData =
            await ProductSchema.findOneAndDelete({'_id': request.params.id});
        return response.status(204).json({code: 204, message: 'product has been deleted...', data: deletedData});
    } catch (e) {
        response.status(500).json({code: 500, message: 'something went wrong...', error: e});
    }
}
// find by id (GET)
const findProductById = async (request, response) => {
    try {
        if (!request.params.id) {
            return response.status(400).json({code: 400, message: 'some fields are missing!..', data: null});
        }
        const productData =
            await ProductSchema.findById({'_id': request.params.id});
        if (productData) {
            return response.status(200).json({code: 200, message: 'category data...', data: productData});
        }
        return response.status(404).json({code: 404, message: 'product data not found...', data: null});
    } catch (e) {
        response.status(500).json({code: 500, message: 'something went wrong...', error: e});
    }
}
// find all (GET)
const findAllProducts = async (request, response) => {
    try {
        const {searchText, page = 1, size = 10} = request.query;
        const pageIndex = parseInt(page);
        const pageSize = parseInt(size);

        const query = {};
        if (searchText) {
            query.$text = {$search: searchText}
        }
        const skip = (pageIndex - 1) * pageSize;
        const productList = await ProductSchema.find(query)
            .limit(pageSize)
            .skip(skip);
        const productListCount = await ProductSchema.countDocuments(query);
        return response.status(200).json({
            code: 200,
            message: 'category data data...',
            data: {list: productList, dataCount: productListCount}
        });
    } catch (e) {
        response.status(500).json({code: 500, message: 'something went wrong...', error: e});
    }


}

// Helper function to generate file hash (you can use crypto for this)
const crypto = require('crypto');

const generateFileHash = (fileData) => {
    return crypto.createHash('md5').update(fileData.key + fileData.originalname).digest('hex');
};


module.exports = {
    createProduct, updateProduct, deleteProduct, findProductById, findAllProducts
}