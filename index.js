const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000


// madilware

app.use(cors());
app.use(express.json());



// mongodb connact


const uri = `mongodb+srv://${process.env.BD_USER}:${process.env.BD_PASS}@cluster0.jg43ilw.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

         const createTaskCollaction =client.db("jobTask").collection("crateTask")
          


        //  app.get("/crateTask" , async (req , res)=>{
        //     const mytask = createTaskCollaction.find();
        //     const result = await mytask.toArray()
        //     res.send(result)
        //  })


        // app.get("/crateTask", async (req,res)=>{
        //     try{
        //         console.log(req.query.email);
        //         let query = {};
        //         if ( req.query?.email){
        //             query = { email: req.query.email};
        //         }
        //         const result = await createTaskCollaction.find(query).toArray();
        //         console.log(result)
        //         res.send(result);
            
        //     }
        //     catch (error) {
        //         console.error(error)
        //         res.status(500).send("internal error")
        //     }
        // })

        app.get('/crateTask', async (req, res) => {
            try {
                console.log(req.query.email);
                let query = {};
                if (req.query?.email) {
                    console.log(req.query?.email)
                    query = { email: req.query.email };
                }
                const result = await createTaskCollaction.find(query).toArray();
                console.log(result)
                res.send(result);
            } catch (error) {
                console.error(error);
                res.status(500).send("Internal Server Error");
            }
        });

         app.post("/crateTask", async (req , res)=>{
           const newTask = req.body;
           console.log(newTask);
           const result = await createTaskCollaction.insertOne(newTask);
           res.send(result)

         })


         app.delete("/crateTask/:id",async (req, res) => {
            const id = req.params.id;
            console.log("please delete form data", id);
            const queary = { _id: new ObjectId(id) };
            const result = await createTaskCollaction.deleteOne(queary);
            res.send(result);
          });





    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);








app.get('/' , (req , res)=>{
    res.send("task is running")
} );

app.listen(port , ()=>{
    console.log(` job task is running ${port}`);
})