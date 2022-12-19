const router = require('express').Router();
const {
  createCashOrder,
  findAllOrders,
  findSpecificOrder,
  filterOrderForLoggedUser,
  updateOrderToPaid,
  updateOrderToDelivered,
  checkoutSession,
} = require('../controllers/orderControllers');

const {protect,allowedTo}= require('../controllers/authControllers');





router.get(
  '/checkout-session/:cartId',
   protect,allowedTo('user'),
   checkoutSession
);

router.route('/order/:cartId').post(protect,allowedTo('user'), createCashOrder);
router.get(
  '/order',
  protect,allowedTo('user', 'admin', 'manager'),
  filterOrderForLoggedUser,
  findAllOrders
);
router.get('/order/:id',protect,allowedTo('user', 'admin', 'manager'), findSpecificOrder);

router.put(
  '/:id/pay',
  allowedTo('admin', 'manager'),
  updateOrderToPaid
);
router.put(
  '/:id/deliver',
  protect,allowedTo('admin', 'manager'),
  updateOrderToDelivered
);

module.exports = router;
