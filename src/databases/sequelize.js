const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE_URL,
  {
    dialect: 'postgres',
    logging: false,

    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('✅ Sequelize conectado a Neon PostgreSQL');
  })
  .catch((err) => {
    console.error('❌ Error de conexión:', err);
  });

module.exports = sequelize;