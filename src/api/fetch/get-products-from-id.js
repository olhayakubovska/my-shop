// export const getProductFromId = async (productId) => {
//   try {
//     const response = await fetch(
//       `http://localhost:3007/products?id=${productId}`
//     );
//     if (!response.ok) {
//       throw new Error("Ошибка при получении данных");
//     }
    
//     const productData = await response.json();
//     return productData;
//   } catch (error) {
//     console.error("Ошибка:", error);
//     throw error; 
//   }
// };
