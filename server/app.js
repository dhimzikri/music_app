const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");

// Generate .env file
require("dotenv/config");
const source = process.env.DB_STRING;

// app.use(cors({origin : true}))

app.get("/", (req, res) => {
    return res.json("Hi bro")
})

// user auth
const userRoute = require("./routes/auth")
app.use("/api/users/", userRoute);

mongoose.connect(source, { useNewUrlParser: true })
mongoose.connection.once("open", () => console.log("Connected")).on("error", () => {
    console.log(`ERORR : ${error}`)
})
console.log(process.env.DB_STRING)
app.listen(4000, () => console.log("listening to port:4000"))