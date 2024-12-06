export const getProductsByCategory = async (categoryId, page, limit) => {
  const abc =
    categoryId && `?categoryId=${categoryId}&_page=${page}&_limit=${limit}`;

  try {
    const response = await fetch(`http://localhost:3007/products${abc}`);

    if (!response.ok) {
      throw new Error("Ошибка при получении данных");
    }
    const products = await response.json();
    const links = await response.headers.get("Link");

    return {
      products,
      links,
    };
  } catch (error) {
    console.error("Ошибка:", error);
  }
};
