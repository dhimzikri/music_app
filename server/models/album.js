const mongoose = require("mongoose")

const albumScheme = mongoose.Schema(
    {
        name : {
            type : String,
            require: true,
        },
        imageURL: {
            type: String,
            require: true,
        },
        year: {
            type: String,
            require: true,
        },
    },
    {timestamps : true}
)

module.exports = mongoose.model("album", albumScheme)