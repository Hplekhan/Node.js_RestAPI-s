Project Name : "Managing Products"
(Backend-Task-Assesment)

Table of Contents:
1. Prerequisites
2. Installation
3.Running the Project
4.Interacting with the API
5.Architectural Decisions
6.Contributing

* Prerequisites
    Node.js
    MongoDB
    Express
    Postman / Thunder client(VS-Extension)
  
  
* Installation
  npm install (-g nodemon, express, mongoose)

* Running the Project
  npm start / nodemon index.js

* Interacting with the API
  1.Base URL: http://localhost:8001
    API Endpoints:
      POST /api/products: Create a new product.
      GET /api/products: Get all products.
      GET /api/products/{id}: Get a single product by ID.
      PUT /api/products/{id}: Update a product by ID.
      DELETE /api/products/{id}: Delete a product by ID.
      GET /api/products/search/{keyword}: Search products by name, description, or variant name.

* Architectural Decisions
    MiddleWare usage
    Error Handling
    Database Structure
    Database MongoDB for this Project.
    Use of Express.js for the server.
    Testing Approach

* Contributing
    Fork the repository / clone the repository (git clone https://github.com/Hplekhan/Node.js-RestAPI's.git)
    Create a new branch.
    Make your changes.
    Submit a pull request. 

  
