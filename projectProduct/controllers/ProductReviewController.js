const ProductReview = require("../models/ProductReview");
const Product = require("../models/Product");
const config = require("../db_config/keys");

// ********************************addProductReview*********************

const addProductReview = async (req, res) => {

	console.log("inside addProductReview ==========> ", req.body);
	const productReview = new ProductReview();
	productReview.user_id = req.body.user_id;
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

POST http://localhost:5021/products/review HTTP/1.1
authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZGQ5OGIzZmIxZWE0NmQ4ZGZkMjYzNCIsInJvbGUiOiJjbGllbnQiLCJpYXQiOjE2MDgzNTg1MDl9.8wMVWdsFDXwepqmGJztyuw2i04CWDkLi-ETqKG0J40c
content-type: application/json

{
	"barcode" : 123123,
	"review" : "fantastic"
} 

*/

module.exports = { addProductReview};
