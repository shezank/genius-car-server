const express = require('express');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 5000;


app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://geniuscarservice:vKWmRpHU9AaH38Rw@cluster0.iyzg5.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
      const database = client.db("geniusCar");
      const serviceCollection = database.collection("service");
     
      
    app.get('/service', async(req,res)=>{
        const quary = {};
        const cursor = await serviceCollection.find(quary);
        const result = await cursor.toArray();
        res.send(result);
    });

    app.get('/service/:id', async (req,res)=>{
      const id = req.params.id;
      const quary = {_id: ObjectId(id)};
      const serviceId = await serviceCollection.findOne(quary);
      res.send(serviceId);
    });

    app.post('/service', async(req,res)=>{
      const newSercice = req.body;
      const result = await serviceCollection.insertOne(newSercice);
      res.send(result);
    });

    app.delete('/service/:id', async (req,res)=>{
      const id = req.params.id;
      const quary = {_id: ObjectId(id)};
      const deleteID = await serviceCollection.deleteOne(quary);
      res.send(deleteID);
    });


    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})