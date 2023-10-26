const paginate = (page, pageSize) => {
  page = + page || 0;
  pageSize = + pageSize || 100;
  const offset = page * pageSize;
  const limit = offset + pageSize;
  return {
    offset,
    limit:pageSize,
  };
};
module.exports = paginate;
