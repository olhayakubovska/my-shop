import { deleteProductFromBasket } from "../fetch/delete-product-from-basket";

export const removeProductFromBasketOperation = async (productId) => {
  await deleteProductFromBasket(productId);
 
  return true;
};
