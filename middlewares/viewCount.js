let count = 0;
const viewCount = async (req, res, next) => {
  count++;
  console.log(count);
};

module.exports = viewCount;
