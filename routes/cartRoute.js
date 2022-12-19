const router= require('express').Router();

const {
  addProductToCart,
  getLoggedUserCart,
  removeSpecificCartItem,
  clearCart,
  updateCartItemQuantity,
  applyCoupon,
} = require('../controllers/CartController');
const {protect,allowedTo}=require('../controllers/authControllers')

router
  .route('/Cart')
  .post(protect,allowedTo('user'),addProductToCart)
  .get(protect,allowedTo('user'),getLoggedUserCart)
  .delete(protect,allowedTo('user'),clearCart)

router.put('/Cart/applyCoupon',protect,allowedTo('user'),applyCoupon);

router
  .route('/Cart/:itemId')
  .put(protect,allowedTo('user'),updateCartItemQuantity)
  .delete(protect,allowedTo('user'),removeSpecificCartItem);

module.exports = router;