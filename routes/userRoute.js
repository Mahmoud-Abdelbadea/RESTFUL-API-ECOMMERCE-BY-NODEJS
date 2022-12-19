const router = require('express').Router()
const authControllers=require('../controllers/authControllers')
const {
    createUser,
    getUser,
    getUsers,
    updateUser,
    updatePasswordOfUser,
    deleteUser,
    uploadUserImage,
    resizeUserImage,
    getLoggedUser,
    updateLoggedUser,
    updatePasswordLoggedUser,
    deleteLogged
  
  
} = require('../controllers/userControllers')
const {protect,allowedTo}=require('../controllers/authControllers')



router.get('/getMe',protect,getLoggedUser)
router.put('/updateMe',protect,updateLoggedUser)
router.patch('/updatePasswordMe',protect,updatePasswordLoggedUser)
router.delete('/deleteMe',protect,deleteLogged)




//admin 
router.route('/user').post(protect,allowedTo('admin','manager'),uploadUserImage,resizeUserImage,createUser).get(protect,allowedTo('admin','manager'),getUsers)
router.route('/user/:id').get(protect,allowedTo('admin','manager'),getUser).put(protect,allowedTo('admin','manager'),updateUser).patch(protect,allowedTo('admin','manager'),updatePasswordOfUser).delete(protect,allowedTo('admin','manager'),deleteUser)
module.exports = router