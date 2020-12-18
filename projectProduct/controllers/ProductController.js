const Product = require("../models/Product");
const config = require("../db_config/keys");

// ********************************Create User ******signup***************

const addProduct = async (req, res) => {
	console.log('inside createUser', req.body);
	
	Product.create({
		name : req.body.name,
		barcode : req.body.barcode,
		brand : req.body.brand,
		description : req.body.description,
		price : req.body.price,
		available : req.body.available,
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
// ***********************************SignIn***************

const getProductList = (req, res) => {
	console.log('inside getProductList');
	Product.findAll()
		.then((products) => {
			console.log('products details => ', products)

			if (products) {
					res.status(200).json({
						message: "Succesfully Get Product List",
						products_list: products,
					});
			} else {
				res.status(404).json({ message: "Products Not Available in Database" });
			}
		})
		.catch((err) => {
			res.status(400).json({
				status: "fail",
				message: err,
			});
		});
};
module.exports = { addProduct, getProductList};
