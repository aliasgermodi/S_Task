const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const app = express();
app.use(cors());

const Router = require("./routes/index");

//DB Config
const db = require("../db_config/keys").MongoURI;
//connect mongo
mongoose
	.connect(db, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
	})
	.then(() => console.log("Mongodb Connected........."))
	.catch((err) => console.log(err));

//middelware
app.use(express.json({ limit: "50mb", extended: true }));

const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: "User API",
			version: "1.0.0",
			description: "User Api to Manage Users",
			servers: ["http://localhost:5011"],
		},
	},
	apis: ["index.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 * @swagger
 * /users/userlist:
 *   get:
 *     summary: get user list
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Success
 *
 */

 /**
  * @swagger
  * /users/register:
  *   post:
  *     summary: create user
  *     consumes:
  *       - application/json
  *     parameters:
  *       - in: body
  *         name: user
  *         description: the user to create.
  *         schema:
  *           type: object
  *           required:
  *           - name
  *         properties:
  *           name:
  *             type: string
  *             description: name of the user
  *             example: 'john'
  *           email:
  *             type: string
  *             description: email of the user
  *             example: 'john123@gmail.com'
  *           gender:
  *             type: string
  *             description: gender of the user
  *             example: 'M or F'
  *           phone_number:
  *             type: integer
  *             description: phone number of the user
  *             example: 9090808090
  *           role:
  *             type: string
  *             description: role of the user
  *             example: 'admin or client'
  *     responses:
  *       201:
  *         description: user registring succesfully
  *       400:
  *         description: failure in registring user
  */

//Routes;
app.use("/users", Router);
const PORT = process.env.PORT || 5011;

app.listen(PORT, console.log(`server starts on port ${PORT} `));

//404 handler
app.use(function (req, res, next) {
	//   console.error(err);
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// Error Handler
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message,
		},
	});
	console.log(err);
});
