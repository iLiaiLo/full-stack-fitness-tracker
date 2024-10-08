const express=require("express");
const app=express();
require("dotenv").config();
const {connectToDb,getDb}=require("./database")

const cors=require("cors");

const PORT =process.env.PORT;

app.use(cors({
    origin:'http://localhost:5173',
    methods:["GET","POST","PUT","PATCH","DELETE"],
    allowedHeaders:"Content-type"
}))

app.use(express.json());

const db={database:null};


connectToDb((err)=>{
    if(!err){ 
        app.listen(PORT,()=>console.log(`server running on port ${PORT}`))
    }
    db.database=getDb()
   
})


app.get('/exercises',(req,res)=>{

    db.database.collection("exercises").find()
    .toArray()
    .then((data)=>res.status(200).json(data))
    .catch(e=>res.status(500).json({"error":e}))
    
})

app.get('/Days',(req,res)=>{
    db.database.collection("Days").find()
    .toArray()
    .then((data)=>res.status(200).json(data))
    .catch(e=>res.status(500).json({"error":e}))
})


app.post('/exercises',(req,res)=>{
    const body=req.body; 
    db.database.collection("Days")
    .insertOne(body)
    .then((stat)=>res.status(201).json(stat))
    .catch(()=>res.status(500).json({"error":"could not added"}))
})

app.patch("/exercises/:id",(req,res)=>{
    const body=req.body;
    const id=+req.params.id;
    db.database.collection("Days")
    .updateOne({id:id},{$set:body})
    .then(stat=>res.status(200).json(stat))
    .catch(()=>res.status(500).json({"error":"could not updated"}))
})

app.delete('/exercises/:id',(req,res)=>{
    const id=+req.params.id;
    db.database.collection("Days")
    .deleteOne({id:id})
    .then((stat)=>res.status(200).json(stat))
    .catch(()=>res.status(500).json({"error":"could not deleted"}))
})




