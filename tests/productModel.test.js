const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../app');  // Adjust the path accordingly
const Product = require('../models/product');  // Adjust the path accordingly

chai.use(chaiHttp);
const expect = chai.expect;

describe('Product Tests', () => {
    // Database sucsessfull connect and should clean up
    before(async () => {
        await mongoose.connect("mongodb://localhost:27017/testdb", { useNewUrlParser: true, useUnifiedTopology: true });
    });

    after(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await Product.deleteMany({});
    });

    // Model Tests
    describe('Product Model Tests', () => {
        it('should create a new product', async () => {
            const newProduct = {
                name: 'Test Product',
                price: 29.99,
                description: 'Test Description',
                color: 'Blue'
            };
            const createdProduct = await Product.create(newProduct);
            expect(createdProduct.name).to.equal(newProduct.name);
        });

        //this is for sinle product
        it('should retrieve a product by ID', async () => {
            const newProduct = {
                name: 'Test Product',
                price: 29.99,
                description: 'Test Description',
                color: 'Blue'
            };
            const createdProduct = await Product.create(newProduct);

            const retrievedProduct = await Product.findById(createdProduct._id);
            expect(retrievedProduct.name).to.equal(newProduct.name);
        });
    });

    // Endpoint Tests
    describe('Product Endpoint Tests', () => {
        it('should create a new product', async () => {
            const response = await chai.request(app)
                .post('/products')
                .send({
                    name: 'Test Product',
                    price: 29.99,
                    description: 'Test Description',
                    color: 'Blue'
                });

            expect(response).to.have.status(200);
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.have.property('name', 'Test Product');
        });

        it('should retrieve a product by ID', async () => {
            const newProduct = {
                name: 'Test Product',
                price: 29.99,
                description: 'Test Description',
                color: 'Blue'
            };
            const createdProduct = await Product.create(newProduct);

            const response = await chai.request(app)
                .get(`/products/${createdProduct._id}`);

            expect(response).to.have.status(200);
            expect(response.body).to.have.property('name', 'Test Product');
        });
    });


});
