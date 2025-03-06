const express = require("express");
const app = express();
const cors = require("cors");
const mainRouter = require("./routes/index");
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use("/api/v1", mainRouter);

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({
        message: "Something went wrong!"
    })
})

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`)
})
