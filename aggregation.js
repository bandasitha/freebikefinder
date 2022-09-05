const { MongoClient } = require('mongodb');

async function main() {

    const uri = "mongodb+srv://superuser:4IYc1f1LQtmvDELv@cluster0.mwyfrof.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        await companiesAndHelmets(client, "CA");
        console.log("Finding shops")
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function companiesAndHelmets(client, state){
    const pipeline = [
        {
          '$match': {
            'state': state
          }
        }, {
          '$match': {
            'helmets': 'TRUE'
          }
        }, {
          '$limit': 5
        }
      ];
      const aggCursor = client.db("freebikefinder").collection("companies").aggregate(pipeline);
      await aggCursor.forEach(companyList => {
        console.log(`${companyList._id}: ${companyList.name}`)
      })
}