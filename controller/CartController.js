const CartSchema = require('../model/CartSchema');
// save (POST)
const createCartRecord = async (request, response) => {
    try {
        const {userId,qty, productId, createdDate} = request.body;
        if (!userId || !productId || !createdDate) {
            return response.status(400).json({code: 400, message: 'some fields are missing!..', data: null});
        }
        const cart = new CartSchema({
            userId: userId,
            qty: qty,
            productId: productId,
            createdDate: createdDate
        });

        const saveData = await cart.save();
        return response.status(201).json({code: 201, message: 'cart record has been saved...', data: saveData});
    } catch (e) {
        response.status(500).json({code: 500, message: 'something went wrong...', error: e});
    }
}
// update (PUT)
const updateCartRecord = async (request, response) => {
    try {
        const {userId, productId,qty, createdDate} = request.body;
        if (!userId || !productId|| !qty || !createdDate) {
            return response.status(400).json({code: 400, message: 'some fields are missing!..', data: null});
        }
        const updateData = await CartSchema.findOneAndUpdate({'_id': request.params.id}, {
            $set: {
                qty: qty,
                userId: userId,
                productId: productId,
                createdDate: createdDate
            }
        }, {new: true});
        return response.status(200).json({code: 200, message: 'cart record has been updated...', data: updateData});
    } catch (e) {
        response.status(500).json({code: 500, message: 'something went wrong...', error: e});
    }
}
// delete (DELETE)
const deleteCartRecord = async (request, response) => {
    try {
        if (!request.params.id) {
            return response.status(400).json({code: 400, message: 'some fields are missing!..', data: null});
        }
        const deletedData =
            await CartSchema.findOneAndDelete({'_id': request.params.id});
        return response.status(204).json({code: 204, message: 'cart record has been deleted...', data: deletedData});
    } catch (e) {
        response.status(500).json({code: 500, message: 'something went wrong...', error: e});
    }
}
// find by id (GET)
const findCartRecordById = async (request, response) => {
    try {
        if (!request.params.id) {
            return response.status(400).json({code: 400, message: 'some fields are missing!..', data: null});
        }
        const cartData =
            await CartSchema.findById({'_id': request.params.id});
        if (cartData) {
            return response.status(200).json({code: 200, message: 'cart data...', data: cartData});
        }
        return response.status(404).json({code: 404, message: 'cart data data not found...', data: null});
    } catch (e) {
        response.status(500).json({code: 500, message: 'something went wrong...', error: e});
    }
}
// find all (GET)
const findAllCartRecords = async (request, response) => {
    try {
        const {page = 1, size = 10} = request.query;
        const pageIndex = parseInt(page);
        const pageSize = parseInt(size);

        const skip = (pageIndex - 1) * pageSize;
        const cartDataList = await CartSchema.find()
            .limit(pageSize)
            .skip(skip);
        const cartDataListCount = await CartSchema.countDocuments();
        return response.status(200).json({
            code: 200,
            message: 'category data data...',
            data: {list: cartDataList, dataCount: cartDataListCount}
        });
    } catch (e) {
        response.status(500).json({code: 500, message: 'something went wrong...', error: e});
    }


}
module.exports = {
    createCartRecord, updateCartRecord, deleteCartRecord, findCartRecordById, findAllCartRecords
}