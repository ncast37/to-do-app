const { DataTypes } = require('sequelize');



module.exports = function (sequelize) {


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
                model: 'User',
                key: 'id'
            }
        }
    },
        {
            freezeTableName: true
        }
    )


    List.insertList = function (name, description, userId) {

        return List.create({
            name: name,
            description: description,
            userId: userId
        });
    }

    List.fetchLists = function (userId) {
        return List.findAll({
            where: {
                userId: userId
            }
        });
    }

    List.deleteList = function (id) {
        return List.destroy({
            where: {
                id: id
            }
        });
    }

    return List;

}
