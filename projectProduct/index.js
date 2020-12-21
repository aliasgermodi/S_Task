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
			title: "Product API",
			version: "1.0.0",
			description: "Api to Manage Product",
			servers: ["http://localhost:5021"],
		},
	},
	apis: ["index.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 * @swagger
 * /products:
 *   get:
 *     summary: get product list
 *     description: Get all products
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Fail
 *
 */

/**
 * @swagger
 * /products/search/{id}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id   # Note the name is the same as in the path
 *         schema:
 *           type: string
 *         description: The product name
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Fail
 *       404:
 *         description: product not found
 *
 */

 /**
 * @swagger
 * /products/barcode:
 *   get:
 *     parameters:
 *       - in: query
 *         name: barcode   # Note the name is the same as in the path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product barcode
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Fail
 *       404:
 *         description: product not found
 *
 */

//Routes;
app.use("/products", Router);
const PORT = process.env.PORT || 5021;

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
