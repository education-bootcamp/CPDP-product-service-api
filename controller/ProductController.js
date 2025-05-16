const ProductSchema = require('../model/ProductSchema');
// save (POST)
const createProduct = async (request, response) => {
    try {
        const {productName, file, actualPrice, oldPrice, qty, description, discount, categoryId} = request.body;
        if (!productName || !file || !actualPrice || !oldPrice || !qty || !description || !discount || !categoryId) {
            return response.status(400).json({code: 400, message: 'some fields are missing!..', data: null});
        }
        const product = new ProductSchema({
            // client side must send the file resource
            // you must upload the icon into the S3 bucket and then you can get the response body.
            // the client send the ids of all the available countries, and the system must find all the countries for the request and save.
            productName: productName,
            images: [
                {
                    hash: 'Temp Hash',
                    resourceUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr1TiZMtNq_El78BMq7-uS7g01qtuiAAVNj6tLspl1bAMw_t9AgZsxNlkrEzXrrYMGcz_S_pKEDq4FU-A_vW875CtAp1DHRfKZAt7xoww',
                    fileName: 'Temp File Name',
                    directory: 'Temp Directory'
                }
            ], // assume that you have send the image to the s3
            actualPrice: actualPrice,
            oldPrice: oldPrice,
            qty: qty,
            description: description,
            discount: discount,
            categoryId: categoryId
        });

        const saveData = await product.save();
        return response.status(201).json({code: 201, message: 'product has been saved...', data: saveData});
    } catch (e) {
        console.log(e)
        response.status(500).json({code: 500, message: 'something went wrong...', error: e});
    }
}
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
module.exports = {
    createProduct, updateProduct, deleteProduct, findProductById, findAllProducts
}