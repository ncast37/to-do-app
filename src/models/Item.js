const { DataTypes } = require('sequelize');



module.exports = function (sequelize) {
    const Item = sequelize.define('Item', {
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
                model: "List",
                key: 'id'
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: "User",
                key: 'id'
            }
        }
    },
        {
            freezeTableName: true
        }
    );



    Item.insertItem = function (
        name,
        description,
        status,
        dateCreated,
        dateDue,
        dateCompleted,
        priority,
        listId,
        userId) {
        return Item.create({
            name: name,
            description: description,
            status: status,
            dateCreated: dateCreated,
            dateDue: dateDue,
            dateCompleted: dateCompleted,
            priority: priority,
            listId: listId,
            userId: userId
        });
    }

    Item.fetchItems = function (listId, userId) {
        return Item.findAll({
            where: {
                listId: listId,
                userId: userId
            }
        });
    }

    Item.fetchAllItemsbyUser = function (userId) {
        return Item.findAll({
            where: {
                userId: userId
            }
        });
    }

    Item.deleteItem = function (id, userId) {
        return Item.destroy({
            where: {
                id: id,
                userId: userId
            }
        });
    }

    Item.removeAllItemsbyUser = function (userId) {
        return Item.destroy({
            where: {
                userId: userId
            }
        });
    }


    return Item;
}




// List.hasMany(Item, { foreignKey: 'listId' });
// Item.belongsTo(List, { foreignKey: 'listId' });

// User.hasMany(Item, { foreignKey: 'userId' });
// Item.belongsTo(User, { foreignKey: 'userId' });


