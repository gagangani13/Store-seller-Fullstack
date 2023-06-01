const express=require('express')
const router=express.Router()
const controller=require('../controller/controller')
router.post('/postItems',controller.postItemsController)
router.get('/',controller.getItemsController)
router.patch('/removeItems/:Id',controller.removeItemsController)
module.exports=router