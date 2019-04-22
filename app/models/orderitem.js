'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    orderId: DataTypes.NUMBER,
    type: DataTypes.STRING,
    size: DataTypes.STRING,
    count: DataTypes.NUMBER
  }, {
    scopes: {
      public: {
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'orderId']
        }
      }
    }
  });
  OrderItem.associate = function (models) {
    OrderItem.belongsTo(models.Order,{ as: 'order', foreignKey: 'id' });
  };
  return OrderItem;
};