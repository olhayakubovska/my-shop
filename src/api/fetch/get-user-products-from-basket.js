export const getUserProductsFromBasket = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3007/basket`); 
    if (!response.ok) {
      throw new Error("Ошибка при получении корзины");
    }

    const cartItems = await response.json();   
    //  console.log(cartItems, "все продукты ");

    // Фильтруем элементы по userId
    const userCartItems = cartItems.filter((item) => item.userId === userId);
        // console.log(userCartItems, "продукты из корзины юзера")

    return userCartItems; 
  } catch (error) {
    console.error("Ошибка:", error);
    throw error; 
  }
};
