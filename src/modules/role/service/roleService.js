const { roleE_VALUES } = require('../models/role');

const getAvailablerolees = async () => {
  return roleE_VALUES;
};

module.exports = {
  getAvailablerolees
};
