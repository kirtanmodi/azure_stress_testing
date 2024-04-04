require("dotenv").config();
const { CosmosClient } = require("@azure/cosmos");

const endpoint = process.env.ENDPOINT;
const key = process.env.KEY;
const databaseId = process.env.DATABASE_ID;
const containerId = process.env.CONTAINER_ID;

const client = new CosmosClient({ endpoint, key });

async function getCount() {
  try {
    const querySpec = {
      query: "SELECT VALUE COUNT(1) FROM c",
    };

    const { resources: count } = await client.database(databaseId).container(containerId).items.query(querySpec).fetchAll();
    return count[0];
  } catch (error) {
    console.error("Error querying count:", error);
    throw error;
  }
}

getCount()
  .then((count) => {
    console.log("Total number of items:", count);
  })
  .catch((error) => {
    console.error("Failed to retrieve count:", error);
  });
