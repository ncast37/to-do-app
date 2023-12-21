const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite'  // replace with your desired path
});

sequelize.query("SELECT name FROM sqlite_master WHERE type='table'")
    .then(([results, metadata]) => {
        if (results.length > 0) {
            console.log('Tables in the database:');
            results.forEach(table => {
                console.log(table.name);
            });
        } else {
            console.log('No tables in the database.');
        }
    })
    .catch(err => console.log("Error during table check:", err));