const { DataTypes } = require('sequelize');
const sequelize = require('../../../databases/sequelize');

const EmailVerification = sequelize.define('EmailVerification', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM(
            'EMAIL_VERIFICATION',
            'PASSWORD_RESET'
        ),
        allowNull: false
    },

    code: {
        type: DataTypes.STRING,
        allowNull: false
    },  
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    used: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'email_verifications',
    timestamps: true
});

module.exports = EmailVerification;