const mongoose= require("mongoose");
const TransactionSchema=require("../Schemas/TransactionSchema");

const Transaction= mongoose.model("Transaction",TransactionSchema);

module.exports=Transaction;