
const router= require('express').Router()
const {
  signup,
 login,
  forgotPassword,
  verifyPassResetCode,
  resetPassword,
} = require('../controllers/authControllers');



router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.post('/verifyResetCode', verifyPassResetCode);
router.put('/resetPassword', resetPassword);

module.exports = router;