const express = require("express");
const adminVerify = require("../middleware/adminVerify").adminVerify;
const clientVerify = require("../middleware/clientVerify").clientVerify;
const router = express.Router();
const { addProduct, getProductByName, getProductbyBarcode, getProductList } = require('../controllers/ProductController')
const { addProductReview } = require('../controllers/ProductReviewController')

router.post("/", adminVerify(), addProduct);
router.get("/search/:id", getProductByName);
router.get("/barcode", getProductbyBarcode);
router.get("/", getProductList);

router.post("/review", clientVerify(), addProductReview);
module.exports = router;
