const data = ``;

function extractUniqueOrderIds(inputString) {
  const regex = /"id\\?":\\?"?(\d+)/g;
  const uniqueIds = new Set();
  let match;

  while ((match = regex.exec(inputString)) !== null) {
    uniqueIds.add(match[1]);
  }

  if (!uniqueIds.size) console.log("No matches found, check regex and input string format.");

  return {
    ids: Array.from(uniqueIds).sort(),
    count: uniqueIds.size,
  };
}

const uniqueOrderIds = extractUniqueOrderIds(data);
console.log("Unique Order IDs:", uniqueOrderIds);
