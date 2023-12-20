const { Sequelize, DataTypes } = require('sequelize');
const { User } = require('./User');
const md5 = require('md5');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../db.sqlite'
})

const List = sequelize.define('List', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING
    },

    description: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'active'
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
})

sequelize.sync({ force: false })
    .then(async () => {
        console.log(`Database & List tables created!`);
    });

function insertList(name, description, userId) {

    return List.create({
        name: name,
        description: description,
        userId: userId
    });
}

function fetchLists(userId) {
    return List.findAll({
        where: {
            userId: userId
        }
    });
}

function deleteList(id) {
    return List.destroy({
        where: {
            id: id
        }
    });
}


User.hasMany(List, { foreignKey: 'userId' });
List.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    List,
    insertList,
    fetchLists,
    deleteList
}