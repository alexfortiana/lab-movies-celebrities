const mongoose = require("mongoose")
const movieSchema = mongoose.Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Celebrities"

    }]

})

const MoviesModel = mongoose.model("Movie", movieSchema)
module.exports = MoviesModel