const {Sequelize, DataTypes} = require('sequelize');
const List = require('./List');
const md5 = require('md5');

const sequelize = new Sequelize({});


const Item = sequelize.define('Item',{
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
        type: DataTypes.STRING
    },
    dateCreated: {
        type: DataTypes.STRING
    },

    dateDue: {
        type: DataTypes.STRING
    },
    dateCompleted: {
        type: DataTypes.STRING
    },
    priority: {
        type: DataTypes.STRING
    },

    listId: {
        type: DataTypes.INTEGER,
        references: {
            model: List,
            key: 'id'
        }
    }
});


List.hasMany(Item, {foreignKey: 'listId'});
Item.belongsTo(List, {foreignKey: 'listId'});