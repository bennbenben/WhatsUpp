// Unique Array receives an array of objects, and remove duplicates by the specified key
const uniqueArray = (arr, key) => {
  const uniqueIds = new Set();

  const unique = arr.filter((element) => {
    const isDuplicate = uniqueIds.has(element[key]);
    uniqueIds.add(element[key]);

    if (!isDuplicate) {
      return true;
    }
    
    return false;
  });

  return unique;
};

module.exports = uniqueArray;
