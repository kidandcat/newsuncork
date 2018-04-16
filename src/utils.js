export const getProductByID = (products, id) => {
  for (let p of products) {
    if (p.id == id) return p;
  }
  return null;
};
