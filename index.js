const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId


// middleware
app.use(cors())
app.use(express.json())

// user:dbuser1
// password:01SKCre6h9LWYYfn



const uri = "mongodb+srv://dbuser2:01SKCre6h9LWYYfn@cluster0.krkpu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect()
    const userCollection = client.db("foodExpress").collection("user");
    // const user = {name:"sabila noor", email:"sabilanoor@gmail.com"}
    // const result = await userCollection.insertOne(user)
    // console.log(`user inserted with id : ${result.insertedId}`)


    // get user
    app.get('/user', async (req, res) => {
      const query = {}
      const cursor = userCollection.find(query)
      const users = await cursor.toArray()
      res.send(users)
    })

    app.get('/user/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userCollection.findOne(query)
      res.send(result)
    })

    // post user:add a new user
    app.post('/user', async (req, res) => {
      const newUser = req.body
      console.log('adding new user', newUser)
      const result = await userCollection.insertOne(newUser)
      res.send(result)
    })


    // update put user
    app.put('/user/:id', async (req, res) => {
      const id = req.params.id;
      const updatedUser = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          name: updatedUser.name,
          email: updatedUser.email
        }
      };
      const result = await userCollection.updateOne(filter, updatedDoc, options);
      res.send(result);
    })

    // delete a user 
    app.delete('/user/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const result = await userCollection.deleteOne(query)
      res.send(result)
    })





  }
  finally {
    // await client.close()
  }
}

run().catch(console.dir)


app.get('/', (req, res) => {
  res.send('Hello world all time my world. This is my dream plan an developer.Hello world all time my world. This is my dream plan an developer.Hello world all time my world. This is my dream plan an developer.Hello world all time my world. This is my dream plan an developer.')
})



app.listen(port, () => {
  console.log('CRUD server is runnig', port);
})