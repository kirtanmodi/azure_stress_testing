require("dotenv").config();
const axios = require("axios");
const { orderIds } = require("./data");

const makePostRequest = async (orderId) => {
  const url = process.env.POST_ENDPOINT;
  const body = {
    producer: process.env.PRODUCER,
    hash: "ddaf7acd673e33ffed033573b20f1327cf229894",
    created_at: 1701827190,
    store_id: process.env.STORE_ID,
    scope: "store/order/statusUpdated",
    data: {
      type: "order",
      id: orderId,
      status: {
        previous_status_id: 0,
        new_status_id: 11,
      },
    },
  };

  try {
    await axios.post(url, body);
    console.log(`First request for order ID ${orderId} completed successfully.`);

    await axios.post(url, body);
    console.log(`Second request for order ID ${orderId} completed successfully.`);
  } catch (error) {
    console.error(`Error occurred for order ID ${orderId}:`, error.message);
  }
};

const executeRequests = async () => {
  for (const orderId of orderIds) {
    await makePostRequest(orderId);
  }
};

// executeRequests();

console.log(orderIds.length);
