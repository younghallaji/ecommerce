const router = require('express').Router();

const Product = require('../model/Product');

const multer = require('multer');
// Image Upload Engine
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "./public/images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({storage: fileStorageEngine, limits: {fieldSize: 10 * 1024 * 1024}});

// All Products

router.get("/allproducts", (req, res) => {
    Product.find()
    .then((result) =>{
        res.render('allproduct', {products: result, title: 'All Products'})
    })
    .catch(err => console.log(err));
});


// Adding New Product

// Get Request
router.get('/addproduct', (req, res) => {
    res.render('upload', {title: 'Add Product'});
});

// Post Request
router.post("/addproduct", upload.single("image"), (req, res) =>{
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.file.filename
    });
    product.save()
    .then((result) => {
        res.redirect('/');
    }).catch(err => console.log(err));
});

// Update Product
router.post("/updateproduct/:id", (req, res) =>{
    const id = req.params.id;
    Product.findByIdAndUpdate({_id: id}, req.body)
    .then((result) => {
        console.log(result)
        res.redirect('/')
    })
    .catch(err => console.log(err))
});

// Delete Product
router.delete("/deleteproduct/:id", (req, res) => {
    const id = req.params.id;
    Product.findByIdAndDelete(id)
    .then((result)=>{
        res.json({redirect: '/'})
    })
    .catch(err=>{console.log(err)})
});

module.exports = router;