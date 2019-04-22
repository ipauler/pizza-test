'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
      scopes: {
        public: {
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        }
      }
    });
  Customer.associate = function (models) {
  };
  return Customer;
};