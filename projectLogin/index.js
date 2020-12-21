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
			title: "Login API",
			version: "1.0.0",
			description: "login Api to Manage login",
			servers: ["http://localhost:5001"],
		},
	},
	apis: ["index.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 * @swagger
 * /login:
  *   post:
  *     summary: user login
  *     consumes:
  *       - application/json
  *     parameters:
  *       - in: body
  *         name: login
  *         description: login user.
  *         schema:
  *           type: object
  *           required:
  *           - email
  *           - password
  *         properties:
  *           email:
  *             type: string
  *             description: email of the user
  *             example: 'john123@gmail.com'
  *           password:
  *             type: string
  *             description: password of the user
  *             example: 'qwe123'
  *     responses:
  *       200:
  *         description: user login succesfully
  *       400:
  *         description: failure in login user
  *       404:
  *         description: user not in database
  */

//Routes;
app.use("/", Router);
const PORT = process.env.PORT || 5001;

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
