const express=require('express')
const router=express.Router()
const orderController=require('../controllers/orderController')

router.post('/order',orderController.createOrder)
router.get('/getOrder',orderController.getOrders)


module.exports=router