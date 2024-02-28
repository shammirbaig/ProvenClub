const express=require("express");
const router=express.Router();

const {overdueController}=require("../Controller/LibraryController");
router.get("/:memberid",overdueController);

module.exports=router;