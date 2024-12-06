import { useSelector } from "react-redux";
import styles from "./basket.module.css";
import { useEffect, useState } from "react";
import {
  removeProductFromBasketOperation,
  getUserProductsFromBasketOperation,
} from "../../api/operations";

export const Basket = () => {
  const userId = useSelector(({ user }) => user.id);
  const [userProducts, setUserProducts] = useState([]);

  const removeItem = async (productId) => {
    try {
      await removeProductFromBasketOperation(productId);

      setUserProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.error("Ошибка при удалении продукта:", error.message);
    }
  };

  useEffect(() => {
    if (userId) {
      getUserProductsFromBasketOperation(userId)
        .then((userProductsFromServer) => {
          setUserProducts(userProductsFromServer);
        })
        .catch((error) => {
          console.error("Ошибка при загрузке продуктов:", error.message);
        });
    }
  }, [userId]); 

  return (
    <>
      {userId && (
        <div className={styles.container}>
          {userProducts.map(
            ({
              id,
              productImage,
              productName,
              productPrice,
              productDescription,
            }) => (
              <div key={id} className={styles.productItem}>
                <img
                  src={productImage}
                  alt={productName}
                  className={styles.productImage}
                />
                <div className={styles.productInfo}>
                  <div className={styles.productName}>{productName}</div>
                  <div className={styles.productPrice}>
                    Цена: ${productPrice}
                  </div>
                  <div className={styles.productDescription}>
                    {productDescription}
                  </div>
                </div>
                <div className={styles.btnAndId}>
                  <button className={styles.btn} onClick={() => removeItem(id)}>
                    удалить из корзины
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
};
