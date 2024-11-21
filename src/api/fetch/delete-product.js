export const deleteProduct = async (productId) => {
  return fetch(`http://localhost:3007/products/${productId}`, {
    method: "DELETE",
  });
};
