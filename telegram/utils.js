function safeStringify(obj, replacer = null, space = 2) {
  const cache = new Set();
  const retVal = JSON.stringify(
    obj,
    (key, value) =>
      typeof value === "object" && value !== null
        ? cache.has(value)
          ? undefined // Duplicate reference found, discard key
          : cache.add(value) && value // Store value in our collection
        : value,
    space
  );
  cache.clear();
  return retVal;
}

module.exports = { safeStringify };
