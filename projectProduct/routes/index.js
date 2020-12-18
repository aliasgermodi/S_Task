const express = require("express");
const adminVerify = require("../middleware/adminVerify").adminVerify;
const clientVerify = require("../middleware/clientVerify").clientVerify;
const router = express.Router();
const { addProduct, getProduct, getProductList } = require('../controllers/ProductController')
const { addProductReview } = require('../controllers/ProductReviewController')

router.post("/product", adminVerify(), addProduct);
router.get("/product", getProduct);
router.get("/products", getProductList);

router.post("/product_review", clientVerify(), addProductReview);
module.exports = router;
