const User = require("../models/User");
const config = require("../db_config/keys");
const saltRounds = config.salt;
const bcrypt = require("bcrypt");

const signToken = require("../auth/token").signToken;

// ********************************Create User ******signup***************

const createUser = async (req, res) => {
	console.log('inside createUser', req.body);
	const hash = bcrypt.hashSync(req.body.password, saltRounds, (err, salt) => {
		err ? err : salt;
	});
	User.create({
		name : req.body.name,
		email : req.body.email,
		password : hash,
		gender : req.body.gender,
		phone_number : req.body.phone_number,
		role : req.body.role,
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
// ***********************************SignIn***************

const login = (req, res) => {
	console.log('inside login', req.body);
	User.findOne({ email: req.body.email })
		.then((user) => {
			console.log('user details => ', user)
			console.log('user details password=> ', bcrypt.compareSync(req.body.password, user.password))
			console.log('user details password=> ', bcrypt.compareSync(req.body.password, user.password))

			if (user && bcrypt.compareSync(req.body.password, user.password)) {
				const token = signToken(user._id);
					res.status(200).json({
						message: "Login Successful!",
						token: token,
						userId: user._id,
					});
			} else {
				res.status(404).json({ message: "User not in database" });
			}
		})
		.catch((err) => {
			res.status(400).json({
				status: "fail",
				message: err,
			});
		});
};
module.exports = { createUser, login };
