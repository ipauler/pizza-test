process.env.NODE_ENV = 'development';

const Order = require('../app/models').Order;
const Application = require('./../app/app')
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

const app = new Application();
app.start();

chai.use(chaiHttp);
describe('/GET order', () => {
  it('it should Get all orders', (done) => {
    chai.request(app.getServer())
      .get('/order')
      .end((err, res) => {
        // console.log(res);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('payload');
        res.body.should.have.property('success').eq(true);
        done();
      });
  });
});

describe('/POST user', () => {
  it('it sould post the user info', (done) => {
    const user = {
      items: [{
        type: "margarita",
        size: "small",
        count: "1"
      }],
      customer: {
        firstName: "John",
        lastName: "Doe",
        address: "Paris, main str. 10"
      }
    };
    chai.request(app.getServer())
      .post('/order')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('payload');
        res.body.should.have.property('success').eq(true);
        done();
      });
  });
});

describe('/PUT/:id order', () => {
  it("should update order status", (done) => {
    const order = {
      status: "3"
    };
    const orderId = 2;
    chai.request(app.getServer())
      .put('/order/' + orderId)
      .send(order)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eq(true);
        done();
      });
  });
});

describe('/PUT/:orderId/item/:id orderitem ', () => {
  it("should update order item", (done) => {
    const user = {
      "type": "new type",
      "size": "medium",
      "count": "1"
    };
    const orderId = 11;
    const itemId = 19;
    chai.request(app.getServer())
      .put(`/order/${orderId}/item/${itemId}`)
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eq(true);
        done();
      });
  });
});