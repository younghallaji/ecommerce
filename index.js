const express = require('express');
const mongoose = require('mongoose');
const Product = require('./model/Product');
const stripe = require('stripe')('sk_test_51Dk6rmCGhkJEjIghOq3VIMPUNe62eoRsofF3yL8Fpzt6LgFycxvN5i6LsYtoUaWaoQGFDac7AqXONLfL9l37ywag000nEUChU2');
const productRouter = require('./routes/productRoutes'); 
const homeRouter = require('./routes/homeRoutes');


const app = express();



const DBURI = "mongodb+srv://younghallaji:Muthorlib123@cluster0.ftlcd.mongodb.net/ecommerce?retryWrites=true&w=majority";
mongoose.connect(DBURI)
.then((result) => {
    app.listen(5000)
    console.log('DB Connected');
})
.catch(err => console.log(err));

app.use(express.json())
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.post('/payment', async(req, res) =>{
    // const {product} = req.body;
    console.log(req.body);
    const session = await stripe.checkout.session.create({
        payment_method_types: ['card'],
        line_item: [
            {
                price_data: {
                    currency: 'NGN',
                    product_data: {
                        name: 'Online Good',
                        images: ['images/1637877629709fish.jpg']
                    },
                    unit_amount: req.body.amount * 100
                },
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url: '/success',
        cancel_url: '/error'
    })

    res.json({
        id: session
    })
})


app.use (productRouter);
app.use (homeRouter);









// app.get('/', (req, res) =>{
//     res.render('index', {title: 'Homepage'})
// })




