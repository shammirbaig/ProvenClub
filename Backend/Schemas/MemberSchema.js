const mongoose=require("mongoose");

const MemberSchema= mongoose.Schema({
    "MemberID":Number,
    "MemberName":String
})

module.exports=MemberSchema;