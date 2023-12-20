const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'  // replace with your desired path
});

sequelize.sync()
    .then(() => {
        console.log('Database created apple!');
    });