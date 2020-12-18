const mongoose = require("mongoose");
const User = new mongoose.Schema({
	name: { type: 'string', required: true },
	email: { type: 'string', required: true, unique: true },
	password: { type: 'string', required: true },
	gender: { type: 'string', isin: ["M", "F"], required: true },
	phone_number: { type: 'number', required: true, unique: true },
	role: { type: 'string', isin: ["admin", "client"], required: true },
});

module.exports = mongoose.model("user", User);
