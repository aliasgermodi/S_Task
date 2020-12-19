const mongoose = require("mongoose");
const ProductReview = new mongoose.Schema({
	user_id: { type: 'string', required: true },
	user_name: {type: 'string', required: true },
	barcode: { type: 'number', required: true },
	review: { type: 'string', required: true },
});

module.exports = mongoose.model("product_review", ProductReview);