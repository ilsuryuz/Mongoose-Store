// ** Dependencies **
const express = require('express');
const methodOverride = require("method-override");
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
// ** Method-override **
app.use(methodOverride("_method"))

// ** SEED **
const productSeed = require('./models/productSeed');
app.get('/store/seed', (req, res) => {
    Product.deleteMany({}, (error, allProducts) => {});
    Product.create(productSeed, (error, data) => {
		res.redirect('/store');
	});
});
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
app.get('/store/new', (req, res) => {
    res.render('new.ejs');
});

// ** DELETE **
app.delete("/store/:id", (req, res) => {
    Product.findByIdAndDelete(req.params.id, (err, deletedProduct) => {
        console.log("Deleted: "+deletedProduct)
        res.redirect('/store')
    })
})

// ** UPDATE **
app.put("/store/:id/", (req, res) => {
    Product.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {
            new: true,
        },
        (err, updatedProduct) => {
        res.redirect(`/store/${req.params.id}`)
    })
})
// ** Route for buy button **
app.put("/store/:id/buy", (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        foundProduct.qty -= 1
        foundProduct.save()
        res.redirect('/store')
    })
})

// ** CREATE **
app.post('/store', (req, res) => {
    Product.create(req.body, (error, createdProduct) => {
        res.redirect('/store');
    });
});

// ** EDIT **
app.get("/store/:id/edit", (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
      res.render("edit.ejs", {
        product: foundProduct,
      })
    })
  })
// ** SHOW **
app.get('/store/:id', (req, res) => {
	Product.findById(req.params.id, (err, foundProduct) => {
		res.render('show.ejs', {
			product: foundProduct,
		});
	});
});