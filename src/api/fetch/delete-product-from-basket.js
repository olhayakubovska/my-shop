export const deleteProductFromBasket = async (productId) => {
  try {
    const response = await fetch(`http://localhost:3007/basket/${productId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Ошибка при удалении продукта");
    }

    return await response.json();
  } catch (error) {
    console.error("Ошибка в deleteProductFromBasket:", error);
    throw error;
  }
};
