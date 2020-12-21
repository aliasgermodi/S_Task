const User = require("../models/User");
const bcrypt = require("bcrypt");

const { signToken, verifyToken } = require("../auth/token");
const { JsonWebTokenError } = require("jsonwebtoken");

// ***********************************Login***************

const login = async(req, res) => {
	console.log('inside login', req.body);
	await User.findOne({ email: req.body.email })
		.then((user) => {
			console.log('user details => ', user)
			console.log('user details password=> ', bcrypt.compareSync(req.body.password, user.password))
			console.log('user details password=> ', bcrypt.compareSync(req.body.password, user.password))

			if (user && bcrypt.compareSync(req.body.password, user.password)) {
				const data = { user_id: user._id, role: user.role, name: user.name};
				const token = signToken(data);
				res.status(200).json({
					message: "Login Successful!",
					token: token,
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

	//==checked this api with rest
	/*
	POST http://localhost:5001/login HTTP/1.1
	content-type: application/json
	
	{
		"email" : "clientmama@gmail.com",
		"password" : "qwe123"
	}
	
	*/
};

const verify = (req, res) => {
	try {
		const token = req.headers["authorization"].split(" ")[1];

		res.status(200).json({
			status: "token verified",
			data: verifyToken(token),
		});
	} catch (error) {
		res.status(402).json({
			status: "invalid token",
			message: error,
		});
	}
	//==checked this api with rest
	/*
	POST http://localhost:5001/verify HTTP/1.1
	authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZGQwOWM4NDRlNTRhMTdhNDBiYjRjZiIsInJvbGUiOiJzdXBlcl9hZG1pbiIsImlhdCI6MTYwODMyMTQ5NX0.dIkSNZ88BDLCDLgKhHkBJaeVKSvktm61YoapoGo2c1g
	
	*/
};

module.exports = { login, verify };
