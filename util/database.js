const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_with_mysql','root','12345678',{
    host:'localhost',
    dialect:'mysql'
});

module.exports = sequelize;
