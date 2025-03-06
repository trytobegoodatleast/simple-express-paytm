const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

const userMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message:"token missing"
        })
    }

    const authToken = authHeader.split(" ")[1].trim();
    // trim is used since there can be chances of extra spaces
    
    try {
        const tokenVerify = jwt.verify(authToken, JWT_SECRET);
        //dont need if, since .verify will stop if it fails
        req.userId = tokenVerify.userId;
        return next();
    } catch(error) {
        return res.status(401).json({
             message: "Invalid or expired token"
        })
    }
}

//instead of token we can use API key

module.exports = userMiddleware;