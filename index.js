const mongoose = require('mongoose');
const express=require('express');
const app=express();
app.use(express.json());//converts object to json format and handle post request object

//importing from other file
const productModel = require("./models/UserprodModel")

//connection to database
mongoose.connect("mongodb://localhost:27017/mongotuts")
.then(()=>{
    console.log("Databse connection sucess");
})
.catch((err)=>{
    console.log("Some Problem")
})

// endpoint to create product(POST)
app.post("/products",(req,res)=>{

    let product =req.body;
    productModel.create(product)
    .then((document)=>{
        res.status(200).send({data:document,message:"product doucment added succesfully"})
    })
    .catch((err)=>{
        console.log(err)
        res.status(402).send({message:"some error is occured while adding a new product doc"})
    })

    // res.send({message:"post working"})
})

//endpoint for single prouct
app.get("/products/:id",(req,res)=>{

    productModel.findOne({_id:req.params.id})
    .then((fetchSingleProduct)=>{
        res.status(200).send(fetchSingleProduct)
    })
    .catch((err)=>{
        console.log(err)
        res.status(404).send({message:"error while fetching products data"})
    })

    // res.send({message:"single products"})
})

//endpoint for all products
app.get("/products",(req,res)=>{

    productModel.find()
    .then((fetchProducts)=>{
        res.status(200).send(fetchProducts)
    })
    .catch((err)=>{
        console.log(err)
        res.status(404).send({message:"error while fetching products data"})
    })
    // res.send({message:"whole products"})
})

//endpoint to delete
app.delete("/products/:id",(req,res)=>{

    productModel.deleteOne({_id:req.params.id})
    .then((msgInfo)=>{
        res.status(200).send({message:"Deleted Sucessfully"})
    })
    .catch((err)=>{
        res.status(404).send({message:"entered value did'nt matched to delete..."})
    })
    // console.log(req.body)
    // res.send({message:"delete is working"})
})

//endpoint to update
app.put("/products/:id",(req,res)=>{

    let prod =req.body;

    productModel.updateOne({_id:req.params.id},prod)
    .then((msgInfo)=>{
        res.status(200).send({message:"Updated Sucessfully"})
    })
    .catch((err)=>{
        res.send({message:"Some Problem..."})
    })
    console.log(req.body)
})


// Search endpoint for product name, description, or variant name
app.get("/products/search/:keyword", (req, res) => {
    const keyword = req.params.keyword;

    productModel.find({
        $or: [
            { name: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } },
            { "variants.name": { $regex: keyword, $options: 'i' } }
        ]
    })
    .then((searchResults) => {
        res.status(200).send(searchResults);
    })
    .catch((err) => {
        console.log(err);
        res.status(404).send({ message: "Error while searching for products" });
    });
});



app.listen(8005,()=>{
    console.log("Server Up and Running")
})