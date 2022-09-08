// ** Dependencies **
const express = require('express');
const storeRouter = express.Router();
const Product = require('../models/products');
module.exports = storeRouter;


// ** ROUTES **

// ** SEED **
const productSeed = require('../models/productSeed');
storeRouter.get('/seed', (req, res) => {
    Product.deleteMany({}, (error, allProducts) => {});
    Product.create(productSeed, (error, data) => {
		res.redirect('/store');
	});
});
// ** Index **
storeRouter.get('/', (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render('index.ejs', {
            products: allProducts,
        });
    });
});
// ** NEW **
storeRouter.get('/new', (req, res) => {
    res.render('new.ejs');
});

// ** DELETE **
storeRouter.delete("/:id", (req, res) => {
    Product.findByIdAndDelete(req.params.id, (err, deletedProduct) => {
        console.log("Deleted: "+deletedProduct);
        res.redirect('/store');
    })
})

// ** UPDATE **
storeRouter.put("/:id/", (req, res) => {
    Product.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {
            new: true,
        },
        (err, updatedProduct) => {
        res.redirect(`/store/${req.params.id}`);
    });
});
// ** Route for buy button **
storeRouter.put("/:id/buy", (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        foundProduct.qty -= 1;
        foundProduct.save();
        res.redirect(`/store/${req.params.id}`);
    });
});

// ** CREATE **
storeRouter.post('/', (req, res) => {
    Product.create(req.body, (error, createdProduct) => {
        res.redirect('/store');
    });
});

// ** EDIT **
storeRouter.get("/:id/edit", (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
      res.render("edit.ejs", {
        product: foundProduct,
      });
    });
  });
// ** SHOW **
storeRouter.get('/:id', (req, res) => {
	Product.findById(req.params.id, (err, foundProduct) => {
		res.render('show.ejs', {
			product: foundProduct,
		});
	});
});

// ** Exports **
module.exports = storeRouter;