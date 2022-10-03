const mongoose = require("mongoose")

const songScheme = mongoose.Schema(
    {
        tittle: {
            type: String,
            require: true,
        },
        imageURL: {
            type: String,
            require: true,
        },
        songURL: {
            type: String,
            require: true,
        },
        artist: {
            type: String,
            require: true,
        },
        album: {
            type: String,
            // require: true,
        },
        category: {
            type: String,
            require: true,
        },
    }, { timestamps: true }
)

module.exports = mongoose.model("song", songScheme)