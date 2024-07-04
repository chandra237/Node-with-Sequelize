//shop.js
const path = require('path');

const express = require('express');

const shopControllers = require('../controllers/shop');

const router = express.Router();

router.get('/', shopControllers.getIndex);

router.get('/products',shopControllers.getProducts);

router.get('/products/:productId',shopControllers.getProduct);               // Dynamic path using colon:

router.get('/cart',shopControllers.getCart);

router.post('/cart',shopControllers.postCart);

router.post('/delete-cart-item', shopControllers.postDeleteCartItem);

router.post('/create-order', shopControllers.postOrder);

router.get('/orders',shopControllers.getOrders);

module.exports = router;
