const express = require("express");
const router = express.Router();
const product = require("../controllers/productController");
const upload = require("../middleware/upload");

router.get("/get", product.pagination);
router.get('/get/product',product.getProducts); 
router.get("/get/:id", product.getProduct);

router.post("/", upload.single("image"), product.createPro);

router.delete("/delete/:id", product.deleteProduct);
router.post("/update/:id", upload.single("image"), product.updatePro);

router.get("/product/:type/:catSlug",product.getByCategory);
router.get("/product/:type/:catSlug/:scatSlug", product.getBySubCategory);
router.get("/product/:type", product.getByType);
module.exports = router;
