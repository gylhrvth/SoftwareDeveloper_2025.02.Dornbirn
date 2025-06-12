const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    ingredients: [String],
    difficulty: String,
    rating: Number
});

module.exports = mongoose.model('Recipe', recipeSchema);