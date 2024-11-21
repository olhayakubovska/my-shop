import { getProducts } from "../fetch";

export const getProductsOperation = async () => {
  const products = await getProducts();

  return products;
};
