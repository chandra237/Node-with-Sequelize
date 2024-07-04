const path = require('path');
const express = require('express');
const sequelize  = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views','./views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) =>{
    User.findByPk(1)
        .then(user =>{
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.getError);

Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});            // creating Associations
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Product.belongsToMany(Cart,{through:CartItem});
Cart.belongsToMany(Product,{through:CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through:OrderItem});

sequelize
    // .sync({force: true})
    .sync()
    .then(result => {
        return User.findByPk(1);
    })
    .then(user =>{
        if(!user){
            return User.create({name:'Chandra',email:'chandra@test.com'})
        }
        return user;
    })
    .then(user =>{
        // console.log(user);
        return user.createCart();
    })
    .then(cart =>{
        app.listen(5000);
    })
    .catch(err => {
        console.log(err);
    })





