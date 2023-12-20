const Sequelize = require('sequelize');
const User = require('./User');
const List = require('./List');
const Item = require('./Item');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../db.sqlite'
});


sequelize.sync({ force: true })
    .then(() => {
        console.log('Database & tables created!');
    });