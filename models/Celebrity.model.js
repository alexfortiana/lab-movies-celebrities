const mongoose = require("mongoose")
const celebritiesSchema = new mongoose.Schema({
    name: String,
    occupation: String,
    catchPhrase: String

})

const CelebritiesModel = mongoose.model("Celebrities", celebritiesSchema)
module.exports = CelebritiesModel
