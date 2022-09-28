const mongoose = require("mongoose")

const songScheme = mongoose.Schema(
    {
        name: {
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
        album: {
            type: String,
            // require: true,
        },
        languange: {
            type: String,
            require: true,
        },
        category: {
            type: String,
            require: true,
        },
    }, { timestamps: true }
)

module.exports = mongoose.model("song", songScheme)