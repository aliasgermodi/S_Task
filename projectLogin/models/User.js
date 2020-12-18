const mongoose = require("mongoose");
const User = new mongoose.Schema({
	name:			{type: 'string', required: true },
	email:			{type: 'string', required: true, unique: true },
	password:		{type: 'string', required: true },
	gender:			{type: 'string', required: true },
	phone_number:	{type: 'string', required: true, unique: true },
	role:			{type: 'string', required: true },	
});

module.exports = mongoose.model("user", User);
