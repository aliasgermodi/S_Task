const ProductReview = require("../models/ProductReview");
const Product = require("../models/Product");
const config = require("../../db_config/keys");

// ********************************addProductReview*********************

const addProductReview = async (req, res) => {

	console.log("inside addProductReview ==========> ", req.body);
	const productReview = new ProductReview();
	productReview.user_id = req.body.user_id;
	productReview.user_name = req.body.user_name;
	productReview.barcode = req.body.barcode;
	productReview.review = req.body.review;
	await productReview.save()
		.then(async (result) => {
			await Product.findOne({ barcode: productReview.barcode }, (err, product) => {
					if (product) {
						product.product_reviews.push(productReview);
						product.save();
						res.status(200).json({
							message: "Product review is added succesfully"
						});
					} else {
						res.status(404).json({
							message: "Product is not available"
						});
					}
			});
		})
		.catch((error) => {
			res.status(400).json({
				status: "fail",
				message: error,
			});
		});
};


/*==checked this api with rest

POST http://localhost:5021/products/review HTTP/1.1
authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZGQ5OGIzZmIxZWE0NmQ4ZGZkMjYzNCIsInJvbGUiOiJjbGllbnQiLCJuYW1lIjoibWFtYSIsImlhdCI6MTYwODM3NTM4OX0.cyT0rBB_uJXSO2OgXSrSAPvBr5105apBlOAGu5bocV4
content-type: application/json

{
	"barcode" : 142145,
	"review" : "fantastic bati"
} 

*/

module.exports = { addProductReview};
