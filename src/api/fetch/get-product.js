export const getProduct = async (id) => {
  try {
    const response = await fetch(`http://localhost:3007/products/${id}`);
    if (!response.ok) {
      throw new Error("Ошибка при получении данных");
    }
    const product =await response.json(); 
    return product;
  } catch (error) {
    console.error("Ошибка:", error);
    throw error
  }
};
