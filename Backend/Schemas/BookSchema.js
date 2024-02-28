const mongoose=require("mongoose");

const BookSchema= mongoose.Schema({
    "BookID":Number,
    "BookName":String,
    "NumberOfCopies":Number
})

module.exports=BookSchema;