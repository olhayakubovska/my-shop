// export const getProductsFromIds = async (productsIds) => {
//   try {
//     const productIds = productsIds.map((item) => item.productId);

//     const response = await fetch(
//       `http://localhost:3007/products?id=${productIds}`
//     );

//     if (!response.ok) {
//       throw new Error("Ошибка при получении продуктов");
//     }

//     const productsData = await response.json();

//     return productsData;
//   } catch (error) {
//     console.error("Ошибка:", error);
//     throw error;
//   }
// };
