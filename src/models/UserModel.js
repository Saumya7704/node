const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({

    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    age: {
        type: Number
    },
    status: {
        type: Boolean,
        default: true
    },
    roleId: {
        type: Schema.Types.ObjectId, //batugasoijkadsasiksaj
        ref: "roles",
        required: true
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },

})

module.exports = mongoose.model("users", userSchema)