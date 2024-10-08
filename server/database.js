const {MongoClient}=require("mongodb");
require("dotenv").config()


const URI=process.env.URI;

const client=new MongoClient(URI)

let db={database:null};
module.exports={
     connectToDb:async (cb)=>{
        try {
            const connection =await client.connect()
            const DataBase=connection.db("Fitness");
            db.database=DataBase;
            return cb()
        } catch (error) {
            console.log(error)
            return cb(error)
        }
    },
     getDb:()=>db.database
}