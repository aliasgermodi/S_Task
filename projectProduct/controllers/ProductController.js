const Product = require("../models/Product");
const ProductReview = require("../../models/ProductReview");
const config = require("../../db_config/keys");

// ********************************addProduct*********************

const addProduct = async (req, res) => {
	console.log("inside addProduct", req.body);

	Product.create({
		name: req.body.name,
		barcode: req.body.barcode,
		brand: req.body.brand,
		description: req.body.description,
		price: req.body.price,
		quantity: req.body.quantity,
		available: req.body.available,
	})
		.then((newProduct) => {
			res.status(201).json({
				status: "success",
				data: {
					productInfo: newProduct,
				},
			});
		})
		.catch((err) => {
			res.status(400).json({
				status: "fail",
				message: err,
			});
		});
};

/*==checked this api with rest

POST http://localhost:5021/products HTTP/1.1
authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZGQ5OTE0ZmIxZWE0NmQ4ZGZkMjYzNSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwODM1ODc1M30.Ldle2k42w33LrqkmkmkM_4uPH9kejm0Isv1k09EGNiU
content-type: application/json

{
	"name" : "roll",
	"barcode" : 142148,
	"brand" : "royal",
	"description" : "Have a delicious wadapav with Royal experience",
	"quantity" : 100,
	"price" : 200,
	"available" : true
} 

*/
// ***********************************getProduct***************

const getProductbyBarcode = async (req, res) => {
	console.log("inside getProduct with barcode   ", req.query);

	Product.findOne({ barcode: req.query.barcode })
		.populate("product_reviews")
		.exec(function (err, product_details) {
			if (err) {
				console.log(err);
				res.redirect("error");
			} else {
				if (product_details === null) {
					res.status(404).json({
						message: "Product is Not Available in Database",
					});
				} else {
					res.status(200).json({
						message: "Succesfully Get Product Details",
						product_details: product_details,
					});
				}
			}
		});
};

/* ==checked this api with rest
// GET http://localhost:5021/products/barcode/?barcode=123123 HTTP/1.1

*/

const getProductByName = async (req, res) => {
	console.log("inside getProduct with name   =>", req.params.id);

	Product.find({"name": { $regex: '.*' + req.params.id + '.*', "$options": "i"}})
		.populate("product_reviews")
		.exec(function (err, product_details) {
			if (err) {
				console.log(err);
				res.redirect("error");
			} else {
				if (product_details === null) {
					res.status(404).json({
						message: "Product is Not Available in Database",
					});
				} else {
					res.status(200).json({
						message: "Succesfully Get Product Details",
						product_details: product_details,
					});
				}
			}
		});
};

/* ==checked this api with rest
// GET http://localhost:5021/products/search/ti HTTP/1.1

*/
// ***********************************getProductList***************
const getProductList = (req, res) => {

	console.log("inside getProductList");
	Product.find()
	.populate("product_reviews")
	.exec(function (err, products_list) {
		if (err) {
			console.log(err);
			res.redirect("error");
		} else {
			if (products_list === null) {
				res.status(404).json({
					message: "Products are Not Available in Database",
				});
			} else {
				// console.log(" product count ==> ", products_list.length);
				let productList ={}
				productList.product_count = products_list.length;
				productList.product_list = products_list;
				let products = [];
				let totalCount= 0;
				products = products_list;
				products.map((product) => {
					totalCount += product.quantity;
				})
				// console.log(" product totalCount ==> ", totalCount);
				productList.totalCount = totalCount;
				res.status(200).json({
					message: "Succesfully Get Product list",
					products: productList,
				});
			}
		}
	});

/* ==checked this api with rest
	// GET http://localhost:5021/products HTTP/1.1
	
*/
};
module.exports = { addProduct, getProductByName, getProductbyBarcode, getProductList };
