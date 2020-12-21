const User = require("../models/User");
const config = require("../../db_config/keys");
const saltRounds = config.salt;
const bcrypt = require("bcrypt");


// ********************************Create User *********************

const createUser = async (req, res) => {
	console.log('inside createUser', req.body);
	const hash = await bcrypt.hashSync(req.body.password, saltRounds, (err, salt) => {
		err ? err : salt;
	});
	await User.create({
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
};


// ********************************get User List *********************

const getUserList = async (req, res) => {
	console.log('inside getUserList');
try{
	await User.find()
	.exec(function (err, users_list) {
		if (err) {
			console.log(err);
			res.redirect("error");
		} else {
			if (users_list === null) {
				res.status(404).json({
					message: "Users are Not Available in Database",
				});
			} else {
				// console.log(" product count ==> ", products_list.length);
				let userList ={}
				userList.user_count = users_list.length;
				userList.user_list = users_list;
				
				res.status(200).json({
					message: "Succesfully Get User list",
					products: userList,
				});
			}
		}
	})
}catch{(err) => {
		res.status(400).json({
			status: "fail",
			message: err,
		});
	}};

/* ==checked this api with rest
	// GET http://localhost:5011/users HTTP/1.1
	
*/
};

module.exports = { createUser, getUserList };
