
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://news-portal-admin:kRMrldEynB6i3N3u@cluster0.boat8.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run(req, res) {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        console.log("database connection established");

        const newsCollection = client.db("news-portal").collection("news")

        if (req.method === "GET") {
            const news = await newsCollection.find({}).toArray();
            res.send({ message: "success", statusCode: 200, data: news })
        }



        if (req.method === "POST") {
            const news = req.body;
            const result = await newsCollection.insertOne(news);
            res.json(result)
        }


    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}

export default run
