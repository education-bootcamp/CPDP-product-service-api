const ReviewSchema = require('../model/ReviewSchema');
// save (POST)
const createReview = async (request, response) => {
    try {
        const {orderId, message, createdDate, userId, displayName, productId, ratings} = request.body;
        if (!orderId || !message || !createdDate || !userId || !displayName || !productId || !ratings) {
            return response.status(400).json({code: 400, message: 'some fields are missing!..', data: null});
        }
        const review = new ReviewSchema({
            orderId: orderId,
            message: message,
            createdDate: createdDate,
            userId: userId,
            displayName: displayName,
            productId: productId,
            ratings: ratings
        });

        const saveData = await review.save();
        return response.status(201).json({code: 201, message: 'review has been saved...', data: saveData});
    } catch (e) {
        response.status(500).json({code: 500, message: 'something went wrong...', error: e});
    }
}
// update (PUT)
const updateReview = async (request, response) => {
    try {
        const {orderId, message, createdDate, userId, displayName, productId, ratings} = request.body;
        if (!orderId || !message || !createdDate || !userId || !displayName || !productId || !ratings) {
            return response.status(400).json({code: 400, message: 'some fields are missing!..', data: null});
        }

        const updateData = await ReviewSchema.findOneAndUpdate({'_id': request.params.id}, {
            $set: {
                orderId: orderId,
                message: message,
                createdDate: createdDate,
                userId: userId,
                displayName: displayName,
                productId: productId,
                ratings: ratings
            }
        }, {new: true});
        return response.status(200).json({code: 200, message: 'review has been updated...', data: updateData});
    } catch (e) {
        response.status(500).json({code: 500, message: 'something went wrong...', error: e});
    }
}
// delete (DELETE)
const deleteReview = async (request, response) => {
    try {
        if (!request.params.id) {
            return response.status(400).json({code: 400, message: 'some fields are missing!..', data: null});
        }
        const deletedData =
            await ReviewSchema.findOneAndDelete({'_id': request.params.id});
        return response.status(204).json({code: 204, message: 'review has been deleted...', data: deletedData});
    } catch (e) {
        response.status(500).json({code: 500, message: 'something went wrong...', error: e});
    }
}
// find by id (GET)
const findReviewById = async (request, response) => {
    try {
        if (!request.params.id) {
            return response.status(400).json({code: 400, message: 'some fields are missing!..', data: null});
        }
        const reviewData =
            await ReviewSchema.findById({'_id': request.params.id});
        if (reviewData) {
            return response.status(200).json({code: 200, message: 'review data...', data: reviewData});
        }
        return response.status(404).json({code: 404, message: 'product data not found...', data: null});
    } catch (e) {
        response.status(500).json({code: 500, message: 'something went wrong...', error: e});
    }
}
// find all (GET)
const findAllReviews = async (request, response) => {
    try {
        const {searchText, page = 1, size = 10} = request.query;
        const pageIndex = parseInt(page);
        const pageSize = parseInt(size);

        const query = {};
        if (searchText) {
            query.$text = {$search: searchText}
        }
        const skip = (pageIndex - 1) * pageSize;
        const reviewList = await ReviewSchema.find(query)
            .limit(pageSize)
            .skip(skip);
        const reviewListCount = await ReviewSchema.countDocuments(query);
        return response.status(200).json({
            code: 200,
            message: 'category data data...',
            data: {list: reviewList, dataCount: reviewListCount}
        });
    } catch (e) {
        response.status(500).json({code: 500, message: 'something went wrong...', error: e});
    }


}
module.exports = {
    createReview, updateReview, deleteReview, findReviewById, findAllReviews
}