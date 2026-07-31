const { Sequelize } = require('sequelize');

const useSSL = process.env.DB_SSL === 'true';

const sequelize = new Sequelize(
  process.env.DB_NAME || 'appointmentmanager',
  process.env.DB_USER || 'akxa_admin',
  process.env.DB_PASSWORD || 'AkxaLab2026_Postgres!',
  {
    host: process.env.DB_HOST || '192.168.1.226',
    port: process.env.DB_PORT || 5433,
    dialect: 'postgres',
    logging: false,

    dialectOptions: useSSL
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        }
      : {}
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ Sequelize conectado a PostgreSQL'))
  .catch(err => console.error('❌ Error de conexión:', err));

module.exports = sequelize;