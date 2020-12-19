const User = require("../models/User");
const config = require("../db_config/keys");
const saltRounds = config.salt;
const bcrypt = require("bcrypt");


// ********************************Create User *********************

const createUser = async (req, res) => {
	console.log('inside createUser', req.body);
	const hash = bcrypt.hashSync(req.body.password, saltRounds, (err, salt) => {
		err ? err : salt;
	});
	User.create({
		name: req.body.name,
		email: req.body.email,
		password: hash,
		gender: req.body.gender,
		phone_number: req.body.phone_number,
		role: req.body.role,
	})
		.then((newUser) => {
			res.status(201).json({
				status: "success",
				data: {
					userInfo: newUser,
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

module.exports = { createUser };


/*==checked this api with rest
POST http://localhost:5011/users/register HTTP/1.1
content-type: application/json

{
	"name" : "dada",
	"email" : "admindada@gmail.com",
	"password" : "qwe123",
	"gender" : "M",
	"phone_number" : 7070707070,
	"role" : "admin"
}

*/