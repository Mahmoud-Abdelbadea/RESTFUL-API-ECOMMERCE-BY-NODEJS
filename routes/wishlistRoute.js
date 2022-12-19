
const router = require('express').Router();

const {protect,allowedTo}= require('../controllers/authControllers');

const {
  addProductToWishlist,
  removeProductFromWishlist,
  getLoggedUserWishlist,
} = require('../controllers/wishlistController');


router.route('/wishlist')
.post(protect, allowedTo('user'),addProductToWishlist)
.get(protect, allowedTo('user'),getLoggedUserWishlist);

router.delete('/wishlist/:productId', protect, allowedTo('user'),removeProductFromWishlist);

module.exports = router;