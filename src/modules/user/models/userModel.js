const { DataTypes } = require('sequelize');
const sequelize = require('../../../databases/sequelize');

// Si existe un archivo con los valores ENUM
// const { roleE_VALUES } = require('../../role/models/role');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        references: {
            model: 'roles',
            key: 'id'
        }
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