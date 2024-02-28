const express=require("express");
const router=express.Router();
const {returnController,checkoutController}=require("../Controller/LibraryController");

router.post("/return",returnController);
router.post("/checkout",checkoutController)

module.exports=router;