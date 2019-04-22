'use strict';
module.exports = (sequelize, DataTypes) => {

  const Order = sequelize.define('Order', {
    status: { type: DataTypes.NUMBER, defaultValue: 0 },
    customerId: DataTypes.NUMBER
  }, {
      scopes: {
        public: {
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'customerId']
          }
        }
      }
    });

  Order.associate = (models) => {
    Order.hasMany(models.OrderItem, { as: 'items', foreignKey: 'orderId' });
    Order.belongsTo(models.Customer, { as: 'customer', foreignKey: 'customerId' });
  }

  return Order;
};