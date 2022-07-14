const Order = require('../models/index').Order;
const OrderItem = require('../models/index').OrderItem;
const Customer = require('../models/index').Customer;
const response = require('../utils/response');
const constants = require('../config/constants.json');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class OrderController {

  async list(req, res) {

    
    try {
      const where = {};
      
      let one =1;
      let customerWhere = {};

      const status = parseInt(req.query.status);
      if (Object.values(constants.ORDER_STATUS).includes(status))
        where.status = status;
      if (req.query.customer_name) {
        customerWhere = {
          [Op.or]: [{
            firstName: {
              [Op.like]: `%${req.query.customer_name}%`
            }
          }, {
            lastName: {
              [Op.like]: `%${req.query.customer_name}%`
            }
          }]
        };
      }

      const orders = await Order.scope('public').findAll(
        {
          where,
          include: [
            { model: OrderItem.scope('public'), as: 'items' },
            { model: Customer.scope('public'), as: 'customer', where: customerWhere }
          ],
          order: [['createdAt', 'DESC']],
        });
      
      return res.status(200).send(response.ok(orders));
    } catch (error) {
      return res.status(400).send(response.err({
        message: 'Something went wrong'
      }));
    }
  }

  async get(req, res) {

    try {
      const order = await Order.findByPk(req.params.id, {
        include: [
          { model: OrderItem.scope('public'), as: 'items' },
          { model: Customer.scope('public'), as: 'customer' }
        ]
      });
      
      console.log('something');
      if (!order) {
        return res.status(404).send(response.err({
          message: 'Order Not Found'
        }));
      }
      return res.status(200).send(response.ok(order));
    }
    catch (error) {
      return res.status(400).send(response.err({
        message: 'Something went wrong'
      }));
    }

  }


  async create(req, res) {
    try {
      const order = await Order.create({
        items: req.body.items,
        customer: req.body.customer
      }, {
          include: [
            { model: OrderItem.scope('public'), as: 'items' },
            { model: Customer.scope('public'), as: 'customer' }
          ]
        });

      return res.status(201).send(response.ok(order));
    } catch (error) {
      return res.status(400).send(response.err({
        message: 'Something went wrong'
      }));
    }
  }

  async updateOrder(req, res) {
    try {

      const count = await Order.update({ ...req.body }, {
        where: {
          id: req.params
        }
        
      });
      

      if (count == 0) {
        console.log('failed');
        return res.status(400).send(response.ok());
      }

      return res.status(200).send(response.ok());
    } catch (error) {
      return res.status(400).send(response.err({
        message: 'Something went wrong'
      }));
    }
  }

  async updateItem(req, res) {
    try {
      const order = await Order.findByPk(req.params.orderId);

      if (order.status == constants.ORDER_STATUS.COMPLETE) {
        return res.status(400).send(response.err({
          message: 'Can\'t update already completed order'
        }));
      }

      await OrderItem.update(req.body, {
        where: {
          id: req.params.id,
          orderId: req.params.orderId
        }
      });
      return res.status(200).send(response.ok());
    } catch (error) {
      
      return res.status(400).send(response.err({
         someInfo: "123",
        message: 'Something went wrong'
      }));
    }
  }

  async delete(req, res) {

    try {
      const order = await Order.findByPk(req.params.id);
      if (!order) {
        return res.status(400).send(response.err({
          message: 'Order Not Found',
        }));
      }
      await order.destroy();
      const b =2+3;
      console.log('a');
      return res.status(204).send(response.ok());
    } catch (error) {
      return res.status(400).send(response.err({
        message: 'Something went wrong'
      }));
    }
  }

}
module.exports = new OrderController();
