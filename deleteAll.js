require("dotenv").config();
const { CosmosClient } = require("@azure/cosmos");
const { orderIds } = require("./data");

const endpoint = process.env.ENDPOINT;
const key = process.env.KEY;
const databaseId = process.env.DATABASE_ID;
const containerId = process.env.CONTAINER_ID;

const client = new CosmosClient({ endpoint, key });

async function deleteItemsByPartitionKey(orderIds) {
  const container = client.database(databaseId).container(containerId);
  let count = 0;
  for (const orderId of orderIds) {
    // Query to find items by orderId (partition key)
    const querySpec = {
      query: "SELECT * FROM c WHERE c.orderId = @orderId",
      parameters: [{ name: "@orderId", value: orderId.toString() }],
    };

    const { resources: items } = await container.items.query(querySpec).fetchAll();

    for (const item of items) {
      try {
        // Assuming 'id' is the attribute for the item's unique identifier
        const { resource: result } = await container.item(item.id, orderId.toString()).delete();
        count++;
        console.log(`Deleted item with id: ${item.id} in partition orderId: ${orderId}`);
      } catch (error) {
        console.error(`Failed to delete item with id: ${item.id} in partition orderId: ${orderId}`, error.message);
      }
    }
  }
  console.log(`Total number of items deleted: ${count}`);
}

deleteItemsByPartitionKey(orderIds);
