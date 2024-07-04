const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product',{
      pageTitle:'Add Product',
      path:'/admin/add-product',
      editing:false,
      product:[]
    });
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    req.user.createProduct({
        title:title,
        price:price,
        imageUrl:imageUrl,
        description:description
    })
    .then(result=>{
        // console.log(result);
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    })
    
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit === "true";
    if(!editMode){
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    // Product.findByPk(prodId)
    req.user.getProducts({where:{id: prodId}})
    .then(products => {
        const product = products[0];
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product',{
            pageTitle:'Edit Product',
            path:'/admin/edit-product',
            editing:editMode,
            product:product
        });
    })
    .catch(err=>console.log(err));
    
}

exports.postEditProduct = (req, res, next)=>{
    const prodId = req.body.productId;
    const newTitle = req.body.title;
    const newImageUrl = req.body.imageUrl;
    const newPrice = req.body.price;
    const newDescription = req.body.description;
    

    Product.findByPk(prodId)
    .then(product =>{
        product.title = newTitle,
        product.price = newPrice,
        product.imageUrl = newImageUrl,
        product.description = newDescription
        return product.save();                    // to update record into the table
    })
    .then(() =>{
        console.log('PRODUCT UPDATED');
        res.redirect('/admin/products');
    })
    .catch(err=>{console.log(err)});
    
    
};

exports.postDeleteProduct = (req, res, next)=>{
    const proId = req.body.productId;
    Product.findByPk(proId)
    .then(product =>{
        return product.destroy();                  // to delete a record in table
    })
    .then((result)=>{
        console.log("Item deleted");
        res.redirect('/admin/products');
    })
    .catch(er => console.log(err));
    
};

exports.getProducts = (req,res,next)=>{
    // Product.findAll()
    req.user.getProducts()
    .then(products =>{
        res.render('admin/product-list',{
            path:'/admin/products',
            pageTitle:'Admin Products',
            prods:products
        })
    })
    .catch(err=>console.log(err));
    
}
