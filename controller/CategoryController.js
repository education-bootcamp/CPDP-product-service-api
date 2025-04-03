const CategorySchema = require('../model/CategorySchema');
// save (POST)
const createCategory = (request, response) => {
    const category = new CategorySchema({
        // client side must send the file resource
        // you must upload the icon into the S3 bucket and then you can get the response body.

        // the client send the ids of all the available countries, and the system must find all the countries for the request and save.

        categoryName: request.body.categoryName,
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
    category.save()
        .then(result => {
            response.status(201).json({code:201, message:'customer has been saved...', data:result});
        }).catch(err => {
        response.status(500).json({code:500, message:'something went wrong...', error:err});
    })
}
// update (PUT)
const updateCategory = (request, response) => {
    console.log(request.body);
}
// delete (DELETE)
const deleteCategory = (request, response) => {
    console.log(request.body);
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