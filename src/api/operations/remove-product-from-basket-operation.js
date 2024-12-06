import { deleteProductFromBasket } from "../fetch";

export const removeProductFromBasketOperation = async (productId) => {
  await deleteProductFromBasket(productId);
 
  return true;
};
