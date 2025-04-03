const CategorySchema = require('../model/CategorySchema');
// save (POST)
const createCategory = async (request, response) => {
    try{
        const {categoryName,file,countryIds} = request.body;
        if (!categoryName || !file || !countryIds){
            return response.status(400).json({code:400, message:'some fields are missing!..', data:null});
        }
        const category = new CategorySchema({
            // client side must send the file resource
            // you must upload the icon into the S3 bucket and then you can get the response body.

            // the client send the ids of all the available countries, and the system must find all the countries for the request and save.

            categoryName: categoryName,
            icon: {
                hash: 'Temp Hash',
                resourceUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr1TiZMtNq_El78BMq7-uS7g01qtuiAAVNj6tLspl1bAMw_t9AgZsxNlkrEzXrrYMGcz_S_pKEDq4FU-A_vW875CtAp1DHRfKZAt7xoww',
                fileName: 'Temp File Name',
                directory: 'Temp Directory'
            }, // assume that you have send the image to the s3
            availableCountries: [
                {
                    countryId: 'Temp-Id-1',
                    countryName: 'Sri Lanka',
                },
                {
                    countryId: 'Temp-Id-2',
                    countryName: 'USA',
                }
            ],
        });

        const saveData = await category.save();
        return response.status(201).json({code:201, message:'customer has been saved...', data:saveData});
    }catch (e) {
        response.status(500).json({code:500, message:'something went wrong...', error:e});
    }
}
// update (PUT)
const updateCategory = async (request, response) => {
    try{
        const {categoryName} = request.body;
        if (!categoryName){
            return response.status(400).json({code:400, message:'some fields are missing!..', data:null});
        }
        const updateData = await CategorySchema.findOneAndUpdate({'_id':request.params.id},{
            $set:{
                categoryName:categoryName
            }
        },{new:true});
        return response.status(200).json({code:200, message:'customer has been updated...', data:updateData});
    }catch (e) {
        response.status(500).json({code:500, message:'something went wrong...', error:e});
    }
}
// delete (DELETE)
const deleteCategory = async (request, response) => {
    try{
        if (!request.params.id){
            return response.status(400).json({code:400, message:'some fields are missing!..', data:null});
        }
        const deletedData =
            await CategorySchema.findOneAndDelete({'_id':request.params.id});
        return response.status(204).json({code:204, message:'customer has been deleted...', data:deletedData});
    }catch (e) {
        response.status(500).json({code:500, message:'something went wrong...', error:e});
    }
}
// find by id (GET)
const findCategoryById = (request, response) => {
    console.log(request.body);
}
// find all (GET)
const findAllCategories = (request, response) => {
    console.log(request.body);
}
module.exports = {
    createCategory, updateCategory, deleteCategory, findCategoryById, findAllCategories
}