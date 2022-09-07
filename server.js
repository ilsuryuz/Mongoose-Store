// ** Dependencies **
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/products');

// ** Databse Connection **
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// ** Database Connection Error/Success **
// ** Define callback functions for various events **
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// ** Listener **
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`));

// ** Middleware **
// ** Body parser middleware: give us access to req.body **
app.use(express.urlencoded({ extended: true }));

// ** Index **
app.get('/store', (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render('index.ejs', {
            products: allProducts,
        });
    });
});
// ** ROUTES **

// ** SEED **

// ** NEW **

// ** DELETE **

// ** UPDATE **

// ** CREATE **
app.post('/store', (req, res) => {
    Product.create(req.body, (error, createdProduct) => {
        res.redirect('/store');
    });
});

// ** EDIT **

// ** SHOW **
