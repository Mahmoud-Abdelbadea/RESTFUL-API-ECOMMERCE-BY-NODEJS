const router= require('express').Router();;

const {protect,allowedTo}= require('../controllers/authControllers');

const {
  addAddress,
  removeAddress,
  getLoggedUserAddresses,
} = require('../controllers/addressesControllers');


router.route('/address')
.post(protect,allowedTo('user'),addAddress)
.get(protect,allowedTo('user'),getLoggedUserAddresses);

router.delete('/address/:addressId',protect,allowedTo('user'),removeAddress);

module.exports = router;