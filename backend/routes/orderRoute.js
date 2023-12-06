const express = require("express");
const router = express.Router();

const { isAuthenticationUser, authorizeRoles } = require("../middleware/auth");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderControllers");
router.route("/order/new").post(isAuthenticationUser, newOrder);

router.route("/order/:id").get(isAuthenticationUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticationUser, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticationUser, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticationUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticationUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
