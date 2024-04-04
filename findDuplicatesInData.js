const { orderIds } = require("./data");

function findDuplicatesInData(orderIds) {
  const seen = new Set();
  const duplicates = new Set();

  for (const orderId of orderIds) {
    if (seen.has(orderId)) {
      duplicates.add(orderId);
    } else {
      seen.add(orderId);
    }
  }

  return Array.from(duplicates);
}

const duplicates = findDuplicates(orderIds);
console.log(duplicates.length > 0 ? `Repeating numbers: ${duplicates}` : "No repeating numbers.");
