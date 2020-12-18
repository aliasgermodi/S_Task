const ProductReview = require("../models/ProductReview");
const Product = require("../models/Product");
const config = require("../db_config/keys");

// ********************************addProductReview*********************

const addProductReview = async (req, res) => {

	const productReview = new ProductReview();
	productReview.user_name = req.body.user_name;
	productReview.barcode = req.body.barcode;
	productReview.review = req.body.review;
	productReview.save()
		.then((result) => {
			Product.findOne({ barcode: productReview.barcode }, (err, product) => {
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
			res.status(500).json({ error });
		});
};


/*==checked this api with rest

POST http://localhost:5021/product_review HTTP/1.1
authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZGQxNTU5ZWNjOTE5MGNmYzBkMzMxZCIsInJvbGUiOiJjbGllbnQiLCJpYXQiOjE2MDgzMjUzMTN9.svqHZfuva6EQM-_03NvB9aAznKMAa0oIAoawuwFuAuA
content-type: application/json

{
	"user_name" : "mama",
	"barcode" : 123123123,
	"review" : "delicious"
} 

*/

module.exports = { addProductReview};
