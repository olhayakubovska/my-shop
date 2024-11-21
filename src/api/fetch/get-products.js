export const getProducts = async (page, limit) => {
  try {
    const response = await fetch(`http://localhost:3007/products`);

    if (!response.ok) {
      throw new Error("Ошибка при получении данных: " + response.statusText);
    }

    const products = await response.json();

    return products;
  } catch (error) {
    console.error("Ошибка:", error.message);
  }
};
