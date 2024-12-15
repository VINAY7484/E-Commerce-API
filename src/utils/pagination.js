export const getPaginationOptions = (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;
  
  return { page, limit, skip };
};

export const getPaginationData = (total, page, limit) => ({
  currentPage: page,
  totalPages: Math.ceil(total / limit),
  totalItems: total
});