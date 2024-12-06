import { getUserProductsFromBasket } from "../fetch";

export const getUserProductsFromBasketOperation = async (userId) => {
  const userProducts = await getUserProductsFromBasket(userId);
  return userProducts;
};
