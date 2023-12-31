// database.js
const { Sequelize } = require('sequelize');
const config = require('./src/configs/config');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite'  // replace with your desired path
});

// Import models
const User = require('./src/models/User')(sequelize);
const List = require('./src/models/List')(sequelize);
const Item = require('./src/models/Item')(sequelize);

// Define associations
User.hasMany(Item, { foreignKey: 'userId' });
Item.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(List, { foreignKey: 'userId' });
List.belongsTo(User, { foreignKey: 'userId' });

List.hasMany(Item, { foreignKey: 'listId' });
Item.belongsTo(List, { foreignKey: 'listId' });

// Sync database
sequelize.sync({ force: config.forcesync })
    .then(() => console.log('Database & tables created!'))
    .catch(err => console.log("Database didn't work:", err));

module.exports = { sequelize, User, List, Item };