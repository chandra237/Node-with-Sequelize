const express = require('express');

const app = express();

app.use('/users',(req,res,next)=>{
    console.log('/users - middleware');
    res.send('<p>Im in /users middleware handler</p>');
});

app.use('/',(req,res,next)=>{
    console.log('/middleware');
    res.send('<p>its the middlewae that handles/</p>')
});



app.listen(5000);