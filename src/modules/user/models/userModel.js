const {DataTypes} = require('sequelize');
const sequelize = require('../../../databases/sequelize');
const { roleE_VALUES } = require('../../role/models/role');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    rolee:{
        type: DataTypes.ENUM(...roleE_VALUES),
        allowNull: false,
        defaultValue: 'EMPLOYEE'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    emailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: true
});

module.exports = User;