const router = require('express').Router();
const orderController = require('../controllers/orderController');
const validate = require('../middleware/inputValidator');

router.get('/order/', orderController.list);
router.get('/order/:id', orderController.get);
router.put('/order/:id', validate.updateOrder, orderController.updateOrder);
router.put('/order/:orderId/item/:id', validate.orderItem, orderController.updateItem);
router.post('/order/', validate.createOrder, orderController.create);
router.delete('/order/:id', orderController.delete);

module.exports = router;