const { DataTypes } = require('sequelize');
const md5 = require('md5');


module.exports = function (sequelize) {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            unique: false
        },
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        plan: {
            type: DataTypes.STRING,
            defaultValue: 'free'
        },
    }, {
        freezeTableName: true
    });

    User.register = function (username, email, password, admin) {

        return User.create({
            username: username,
            email: email,
            password: md5(password),
            admin: admin,
            active: true,
            plan: 'free'
        });
    }

    User.getUsersList = function () {
        return User.findAll();
    }

    User.deleteUser = function (id) {
        return User.destroy({
            where: {
                id: id
            }
        })
    }

    User.getUser = function (username, password) {
        return User.findOne({
            where: {
                username: username,
                password: md5(password)
            }
        })
    }

    return User;
}


