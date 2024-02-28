const mongoose= require("mongoose");
const MemberSchema=require("../Schemas/MemberSchema");

const Member= mongoose.model("Member",MemberSchema);

module.exports=Member;