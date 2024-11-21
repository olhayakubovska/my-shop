import { getProductsByCategory } from "../fetch";

export const getProductsFromServerByCategoryOperation = async (
  categoryId,
  page,
  limit
) => {
  const { products, links } = await getProductsByCategory(
    categoryId,
    page,
    limit
  );

  return { products, links };
};
