const mongoose= require("mongoose");
const BookSchema=require("../Schemas/BookSchema");

const Book= mongoose.model("Book",BookSchema);

module.exports=Book;