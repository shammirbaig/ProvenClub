const Book=require("../Models/Book");
const Member=require("../Models/Member");
const Transaction= require("../Models/Transaction");
//checkoutController
const checkoutController=async(req,res)=>{
    //book and member are related
    try{
        const{bookId,memberId}=req.body;
        if(!bookId||!memberId){
            return res.status(404).json({message:"Book or Member is not present in body for checkout "})
        }
        const member=await Member.findOne({MemberID:memberId});
        const book=await Book.findOne({BookID:bookId});
        if(!book|| !member){
            return res.status(404).json({message:"Book or Member does not exist"});
        }
        if(book.NumberOfCopies<1){
            return res.status(404).json({message:"Sorry!The book is currently unavailable"});
        }
        book.NumberOfCopies=book.NumberOfCopies-1;
        await book.save();
    
        const trans= new Transaction({
            MemberID:memberId,
            BookID:bookId,
            EventType:"Checkout",
            Date:new Date()
        })
        await trans.save();
        return res.status(200).json({message:"Book checkout is done!"});
    
    }catch(err){
        console.error(err);
        res.status(500).json({message:"some internal error"});
    }
}




//returnController
//book and member are related
const returnController=async(req,res)=>{
    try{
        const{bookId,memberId}=req.body;
        if(!bookId||!memberId){
            return res.status(404).json({message:"Book or Member is not present in body for return "})
        }
        const member=await Member.findOne({MemberID:memberId});
        const book=await Book.findOne({BookID:bookId});
        if(!book|| !member){
            return res.status(404).json({message:"Book or Member does not exist!"});
        }
        
        book.NumberOfCopies=book.NumberOfCopies+1;
        await book.save();
    
        const trans= new Transaction({
            MemberID:memberId,
            BookID:bookId,
            EventType:"Return",
            Date:new Date()
        })
        await trans.save();
        return res.status(200).json({message:"Book return is done!"});
    
    }catch(err){
        console.error(err);
        res.status(500).json({message:"some internal error"});
    }

}
//overdueController
const overdueController=async(req,res)=>{
    try{
        const memberid=req.params.memberid;
        if(!memberid){
            return res.status(404).json({message:"Member is not present in body for Overdue Calculation."})
        }
        const mem= Member.findOne({MemberID:memberid});
        if(!mem){
            return res.status(404).json({message:"Member does not exist!"});
        }
        //overdue has to be calculated in such a way that we have to see for each transaction if it has the memberId,check the difference between the transactions of the same book id with eventtype checkout -eventtype return
        //if its greater than 7 days add 50rs fine for each day
    
        const transactions=await Transaction.find({MemberID:memberid});
        let overdueBooks = [];
        let totalFine = 0;

        for (const checkout of transactions.filter(t => t.EventType === 'Checkout')) {
            const returnTransaction = transactions.find(t =>
                t.BookID === checkout.BookID && t.EventType === 'Return'
            );

            if (returnTransaction) {
                const dueDate = new Date(checkout.Date);
                dueDate.setDate(dueDate.getDate() + 7);

                if (currentDate > dueDate && returnTransaction.Date > dueDate) {
                    const daysOverdue = Math.ceil((returnTransaction.Date - dueDate) / (24 * 60 * 60 * 1000));
                    const fine = Math.max(0, (daysOverdue - 7) * 50);

                    overdueBooks.push({
                        BookID: checkout.BookID,
                        DueDays: daysOverdue,
                        Fine: fine
                    });

                    totalFine += fine;
                }
            }
        }
        return res.status(200).json({ MemberID: memberid,
            OverdueBooks: overdueBooks,
            TotalFine: totalFine});
    }catch(err){
        return res.status(500).json({message:"Some error"})
    }
    

}

module.exports={
    checkoutController,
    returnController,
    overdueController
}