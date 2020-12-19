const jwt = require("jsonwebtoken");
const config = require("../../db_config/keys");

const signToken = (data) => {
	console.log("sign in data ==> ", data)
	return jwt.sign(
		{
			id: data.user_id,
			role: data.role,
		},
		config.secret
	);
};


const verifyToken = (token) => {
	console.log("verifyToken data ==> ", token)
	return jwt.verify(token, config.secret);
};

module.exports = {
	signToken,
	verifyToken,
};
