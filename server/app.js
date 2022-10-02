const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");

// Generate .env file
require("dotenv/config");
const source = process.env.DB_STRING;

app.use(cors({ origin: true }))
app.use(express.json())

app.get("/", (req, res) => {
    return res.json("Hi bro")
})

// user auth
const userRoute = require("./routes/auth")
app.use("/api/users/", userRoute);

// artist route
const artistRoutes = require("./routes/artist")
app.use("/api/artist/", artistRoutes)
// album route
const albumRoutes = require("./routes/album")
app.use("/api/album", albumRoutes)
// song route
const songRoutes = require("./routes/song")
app.use("/api/song", songRoutes)

mongoose.connect(source, { useNewUrlParser: true })
mongoose.connection.once("open", () => console.log("Connected")).on("error", () => {
    console.log(`ERORR : ${mongoose}`)
})
console.log(process.env.DB_STRING)
app.listen(4000, () => console.log("listening to port:4000"))