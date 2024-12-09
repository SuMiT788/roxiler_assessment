function convertArrayToKeyValueMap(obj, keyStr, valueStr) {
  return obj.reduce((acc, item) => {
    acc[item[keyStr]] = item[valueStr];
    return acc;
  }, {});
}

module.exports = {
  convertArrayToKeyValueMap,
};
