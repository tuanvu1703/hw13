require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const router = require('./routers');
const categoryModel = require('./models/category.model');
const foodModel = require('./models/food.model');

const app = express();
const PORT = 5000;

// Kết nối tới MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// Cấu hình middleware
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static('public')); 

// Sử dụng routes
app.get('/', async (req, res) => {
    try {
        const categories = await categoryModel.find();
        const foods = await foodModel.find();
        res.render('index', { categories, foods });
    } catch (err) {
        console.error('Failed to fetch data', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/foods', async (req, res) => {
    try {
        const foods = await foodModel.find();
        res.render('foods', { foods });
    } catch (err) {
        console.error('Failed to fetch foods', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/categories', async (req, res) => {
    try {
        const categories = await categoryModel.find();
        res.render('categories', { categories });
    } catch (err) {
        console.error('Failed to fetch categories', err);
        res.status(500).send('Internal Server Error');
    }
});

router(app);

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});