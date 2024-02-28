const mongoose=require("mongoose");

const TransactionSchema= mongoose.Schema({
    "MemberID":Number,
    "BookID":Number,
    "EventType":String,
    "Date":Date
})

module.exports=TransactionSchema;