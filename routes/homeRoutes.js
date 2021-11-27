const router = require('express').Router();

const Product = require('../model/Product');

router.get("/:id", (req, res) =>{
    const id = req.params.id;
    Product.findById(id)
    .then((result) => {
        res.render('update', {product: result, title: 'Update Product'})
    })
    .catch(err => console.log(err))
});

router.get("/", (req, res) => {
    Product.find()
    .then((result) =>{
        res.render('index', {products: result, title: 'Homepage'})
    })
    .catch(err => console.log(err));
});





module.exports = router;