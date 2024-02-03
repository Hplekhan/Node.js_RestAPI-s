const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../app');  // Adjust the path accordingly
const Product = require('../models/product');  // Adjust the path accordingly

chai.use(chaiHttp);
const expect = chai.expect;

describe('Product Search Tests', () => {
    // DB Connection and Cleanup
    before(async () => {
        await mongoose.connect("mongodb://localhost:27017/testdb", { useNewUrlParser: true, useUnifiedTopology: true });
    });

    after(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await Product.deleteMany({});
    });

    it('should find products by name', async () => {
        const testProduct = {
            name: 'Test Product',
            price: 29.99,
            description: 'Test Description',
            color: 'Blue'
        };
        await Product.create(testProduct);

        const response = await chai.request(app)
            .get('/products/search/Test Product');

        expect(response).to.have.status(200);
        expect(response.body).to.be.an('array').that.has.lengthOf(1);
        expect(response.body[0]).to.have.property('name', 'Test Product');
    });
});
