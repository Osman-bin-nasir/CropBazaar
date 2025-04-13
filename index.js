const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Product = require('./models/product')
const { render } = require('ejs')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then(() => console.log('connectes to db'))
    .catch(err => console.log(err))

app.get('/products', async (req, res) => {
    const products = await Product.find({})
    res.render('products/index', { products })
})

app.get('/products/new', (req,res)=>{
    res.render('products/new')
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    res.render('products/show', { product })
})

app.listen(3000, () => {
    console.log("listening at 3000")
})