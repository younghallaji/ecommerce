// const filestorage = multer.diskStorage({
//     destination: (req, file, callback)=>{
//         callback(null, "./images");
//     },
//     filename: (req, file, callback)=>{
//         callback(null,  Date.now() + file.originalname);
//     },
// });

// const upload = multer({storage:filestorage, limits: { fieldSize: 10 * 1024 * 1024 }});

// app.post("/addproduct", upload.single("image"), (req, res) =>{
    
//         console.log(req.file);
//         // res.send('Uploaded')
//     const product = new Product({
//         name: req.body.name,
//         price: req.body.price,
//         description: req.body.description,
//         image: req.file.filename
//     });
//     product.save()
//     .then((result) => {
//         res.redirect('/');
//     }).catch(err => console.log(err));
// });



app.post("/addimage", upload.single('image'), (req, res) =>{
    console.log(req.file);
    res.redirect('/');
});

app.get('/addproduct', (req, res) => {
    res.render('upload', {title: 'Add Product'});
})

// app.get("/allproducts", (req, res) => {
//     Product.find()
//     .then((result) =>{
//         res.render('allproduct', {products: result, title: 'All Products'})
//     })
//     .catch(err => console.log(err));
// });