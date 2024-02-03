const mongoose = require('mongoose');


//schema for products
const ProductSchema = mongoose.Schema({
    name:{
        type:String,
    },
    price:{
        type: Number,
        required:[true,"price must be given"]
    },
    description:{
        type: String,
        enum:["Clothing","Accessories","kitchen","Electronics"]
    },
    color:{
        type: String,
        required:true
    },
    variants: [
        {
            name: {
                type: String,
                required: true,
            },
            sku: {
                type: String,
                required: true,
            },
            additionalCost: {
                type: Number,
                default: 0,
            },
            stockCount: {
                type: Number,
                default: 0,
            },
        },
    ],
},{timestamps:true})

//model creation
const productModel = mongoose.model("productdetails",ProductSchema)

module.exports = productModel;