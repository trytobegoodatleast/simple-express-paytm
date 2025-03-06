const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://useitforgoodthings:ZnzQGip3paLqQf1n@cluster0.mgfrs.mongodb.net/paytm");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        minLength: 6,
        maxLength: 30,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        
        
    },lastName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        
        
    },password: {
        type: String,
        required: true,
        minLength: 6,
        
    }
})

const User = mongoose.model("User", userSchema)// collection named users

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // this tells that we are storing ObjectId, which mongodb generates automatically
        ref: 'User',
        required: true,
        
    },
    balance: {
        type: Number,
        required: true,
        
    }
})

const Account = mongoose.model("Account", accountSchema);// collection named accounts

module.exports = {
    User,
    Account
}