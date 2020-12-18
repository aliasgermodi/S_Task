const express = require("express");
const router = express.Router();
const { addProduct, getProductList }  = require('../controllers/ProductController')
router.post("/product", addProduct);
router.get("/product",getProductList)

module.exports = router;
