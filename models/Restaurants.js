// Esquema para la colección de restaurantes
const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
    name: String,
    borough: String,
    cuisine: String,
    address: {
        building: String,
        street: String,
        zipcode: String,
        coord: [Number],
    },
    grades: [
        {
            date: Date,
            score: Number,
        },
    ],
    restaurant_id: String,
    comments: [
        {
            date: Date,
            comment: String,
            _id: mongoose.Schema.Types.ObjectId,
        },
    ],
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;
