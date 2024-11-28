const foodModel = require('../models/food.model');

module.exports = {
    createFood: async (req, res) => {
        const body = req.body;
        await foodModel.create(body);
        return res.redirect('/foods');
    },

    getFoods: async (req, res) => {
        const foods = await foodModel.find();
        return res.status(200).json(foods);
    },

    updateFood: async (req, res) => {
        const body = req.body;
        const id = req.params.id;
        await foodModel.findByIdAndUpdate(id, body, { new: true });
        return res.redirect('/foods');
    },

    deleteFood: async (req, res) => {
        const id = req.params.id;
        await foodModel.findByIdAndDelete(id);
        return res.redirect('/foods');
    }
}