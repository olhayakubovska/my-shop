export const addProductToBasket = async (userId, productId,productImage,productName,productPrice,productDescription) => {
  try {
    const response = await fetch("http://localhost:3007/basket", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      body: JSON.stringify({
        userId: userId,
        productId: productId,
        productImage,
        productName,
        productPrice,
        productDescription
      }),
    });

    if (!response.ok) {
      throw new Error("error!");
    }

    const card = await response.json();
    return card;
  } catch (error) {
    console.log(error);
  }
};
