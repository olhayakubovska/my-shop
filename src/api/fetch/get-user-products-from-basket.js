export const getUserProductsFromBasket = async (userId) => {
  try {
    const response = await fetch(
      `http://localhost:3007/basket?userId=${userId}`
    );

    if (!response.ok) {
      throw new Error("Ошибка при получении корзины");
    }

    const userCartItems = await response.json();

    return userCartItems;
  } catch (error) {
    console.error("Ошибка:", error);
    throw error;
  }
};
