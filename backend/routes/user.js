const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config")
const bcrypt = require("bcrypt");
const saltRounds = 8;
const { User, Account } = require("../model/db")
const userMiddleware = require("../middleware/userMiddleware");


const sigupBody = zod.object({
    userName: zod.string().email(),
    firstName:zod.string().min(3),
    lastName: zod.string().min(3),
    password: zod.string().min(6),
})
router.post("/signup", async (req, res) => {
    const { success } = sigupBody.safeParse(req.body);
    // safeParse returns { success, data, error }

    if (!success) {
        return res.json({
            message: "Invalid signup inputs"
        })
    }

    const isExistingUser = await User.findOne({ userName: req.body.userName });

    if (isExistingUser) {
        return res.json({
            message: "username already exists, try different one"
        })
    }

    const encodedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const newUser = await User.create({
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: encodedPassword,
    })

    await Account.create({
        userId: newUser._id,
        balance: Math.floor(Math.random() * 12000),
    })

    return res.json({
        message:"User created succesfully"
    })
})


const signinBody = zod.object({
    userName: zod.string().email(),
    password: zod.string().min(6),
})
router.post("/signin",async (req, res) => {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
        return res.json({
            message:"Invalid signin inputs"
        })
    }

    const isExistingUser = await User.findOne({ userName: req.body.userName })  
    if (!isExistingUser) {
        return res.json({
            message:"User does not exist, check ur credentials"
        })
    }

    const decodedPassword = await bcrypt.compare(req.body.password, isExistingUser.password);

    if (!decodedPassword) {
        return res.json({
            message:"Password is incorrect"
        })
    }

    const token = jwt.sign({
        userId:isExistingUser._id
    }, JWT_SECRET)

    return res.json({
        message: "user signed in successfully",
        token: token,
    })
})


const updateBody = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().min(6).optional()
})
router.put("/update", userMiddleware ,async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        return res.json({
            message:"invalid inputs"
        })
    }

    const updateData = {};

    if (req.body.firstName) updateData.firstName = req.body.firstName
    if (req.body.lastName) updateData.lastName = req.body.lastName
    if (req.body.password) {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        updateData.password = hashedPassword;
    }

    await User.updateOne(
        { _id: req.userId },
        { $set: updateData }
    )

    return res.json({
        message:"user updated successfully"
    })
})




router.get("/bulk", userMiddleware ,async (req, res) => {
    const filter = req.query.filter || "";

    try {
        const users = await User.find({
            $and: [
                {_id: { $ne: req.userId } }, {
                    $or: [
                        {firstName:{$regex:filter}},
                        {lastName:{$regex:filter}}
                    ]
                }]
        })
    
        return res.json({
            userlist: users.map(user => ({
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                id:user._id
            }))
        })
    } catch {
        return res.json({
            message:"cant retrieve users information"
        })
    }
    
})

router.get("/profile", userMiddleware,async (req, res) => {
    const user = await User.findOne({ _id: req.userId })
    
    return res.json({
        userProfile: {
            userName: user.userName,
            firstName: user.firstName,
            lastName:user.lastName
        }
    })
})

module.exports = router;