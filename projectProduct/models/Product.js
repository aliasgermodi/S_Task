const mongoose = require("mongoose");
const Product = new mongoose.Schema({
	name:			{type: 'string', required: true },
	barcode:			{type: 'number', required: true, unique: true },
	brand:		{type: 'string', required: true },
	description:			{type: 'string', required: true },
	price:	{type: 'number', required: true, unique: true },
	available:			{type: 'boolean', required: true },

});

module.exports = mongoose.model("product", Product);
