require("dotenv").config();
const { CosmosClient } = require("@azure/cosmos");

const endpoint = process.env.ENDPOINT;
const key = process.env.KEY;
const databaseId = process.env.DATABASE_ID;
const containerId = process.env.CONTAINER_ID;

const client = new CosmosClient({ endpoint, key });

async function getDuplicateOrderIds() {
  try {
    const querySpec = {
      query: "SELECT c.orderId FROM c",
    };

    const { resources: orders } = await client.database(databaseId).container(containerId).items.query(querySpec).fetchAll();

    const orderCounts = orders.reduce((acc, { orderId }) => {
      acc[orderId] = (acc[orderId] || 0) + 1;
      return acc;
    }, {});

    const duplicates = Object.entries(orderCounts)
      .filter(([orderId, count]) => count > 1)
      .map(([orderId]) => orderId);

    return duplicates;
  } catch (error) {
    console.error("Error querying duplicate orderIds:", error);
    throw error;
  }
}

getDuplicateOrderIds()
  .then((duplicates) => {
    console.log("Items with duplicate orderIds:", duplicates);
  })
  .catch((error) => {
    console.error("Failed to retrieve duplicate orderIds:", error);
  });
