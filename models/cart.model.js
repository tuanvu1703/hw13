const mongoose = require('mongoose');

const cartScheme = mongoose.Schema({
    is_ordered: { type: Boolean, default: false },
    account_id: { type: mongoose.SchemaTypes.ObjectId, ref: 'account' },
    items: [
        {
            food_id: { type: mongoose.SchemaTypes.ObjectId, ref: 'food' },
            quantity: { type: Number, required: true, default: 1 },
        }
    ],
})

module.exports = mongoose.model('cart', cartScheme);