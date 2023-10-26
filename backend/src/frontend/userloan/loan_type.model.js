const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const loantype = sequelize.define('loantype', {
    name: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: "Y",
    }

  }, {
    tableName: 'cms_loan_type',
  });
  return loantype;
};
