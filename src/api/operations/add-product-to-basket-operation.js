import { addProductToBasket } from "../fetch/add-product-to-basket";

export const addProductToBasketOperation = async (userId, productId,productImage,productName,productPrice,productDescription) => {
  const card = await addProductToBasket(userId, productId,productImage,productName,productPrice,productDescription);

  return {
    err: null,
    res: card,
  };
};
