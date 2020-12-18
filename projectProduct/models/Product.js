const mongoose = require("mongoose");
const ProductReview = require('./ProductReview');

const Product = new mongoose.Schema({
	name: { type: 'string', required: true },
	barcode: { type: 'number', required: true, unique: true },
	brand: { type: 'string', required: true },
	description: { type: 'string', required: true },
	quantity: { type: 'number', required: true },
	price: { type: 'number', required: true },
	available: { type: 'boolean', required: true },

	product_reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product_review' }], //ref

});

module.exports = mongoose.model("product", Product);