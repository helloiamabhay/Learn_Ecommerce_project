const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");
const { isAuthenticationUser, authorizeRoles } = require("../middleware/auth");
const { route } = require("./userRoutes");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/admin/product/new").post(isAuthenticationUser,authorizeRoles("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticationUser,authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticationUser,authorizeRoles("admin"), deleteProduct)
router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticationUser,createProductReview)
router.route("/reviews").get(getProductReviews).delete(isAuthenticationUser,deleteReview)


module.exports = router;
