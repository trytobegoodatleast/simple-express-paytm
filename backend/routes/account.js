const express = require("express");
const router = express.Router();
const userMiddleware = require("../middleware/userMiddleware");
const { Account } = require("../model/db");
const mongoose = require("mongoose");

router.get("/balance", userMiddleware, async (req, res) => {
    
    try { 
        const account = await Account.findOne({ userId: req.userId })
    
        if (!account) {
            return res.json({
                message:"account not found"
            })
        }

        return res.json({
            balance: account.balance
        })
    } catch(error) {
        console.error(error)
        return res.json({
            message:"something went wrong"
        })
    }
})


router.post("/transfer", userMiddleware,async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    const account = await Account.findOne({ userId: req.userId }).session(session);

    console.log(account.balance);
    console.log(amount);
    if (!account || account.balance < amount) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
            message: "User account not found or insufficient balance"
        })
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        session.endSession();
        return res.json({
            message:"beneficiary account not found"
        })
    }

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } },{session});
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }, {session});

    await session.commitTransaction();
    session.endSession();

    return res.json({
        message:"tranfer successful"
    })
})

module.exports = router;
