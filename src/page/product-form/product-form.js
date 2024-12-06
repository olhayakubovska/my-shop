import { useEffect, useState } from "react";
import styles from "./productForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductOperation,
  deleteProductOperaton,
  getCategoriesOperation,
  getProductOperation,
  getProductsOperation,
} from "../../api/operations";
import {
  ACTION_TYPE,
  onOpenModal,
  setProductData,
  setProductsAction,
  updateProductAsync,
} from "../../api/action";
import { getProducts } from "../../api/fetch";
import { Error } from "../../components";
import { ROLE } from "../../constants";
import { ProductRow } from "./product-row";

export const ProductForm = () => {
  const [productId, setProductId] = useState("");
  const [editedName, setEditedName] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedImage, setEditedImage] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [flag, setFlag] = useState(true);
  const [error, setError] = useState(null);
  const [prod, setProd] = useState([]);

  const session = useSelector(({ user }) => user.session);

  const dispatch = useDispatch();

  useEffect(() => {
    getProductsOperation().then((loadedData) => {
      dispatch(setProductsAction(loadedData));
      setProd(loadedData);
    });

    getCategoriesOperation().then((loadedCategories) =>
      setCategories(loadedCategories)
    );
  }, [dispatch]);

  const editProduct = (ItemId) => {
    getProductOperation(ItemId).then((loadedProduct) => {
      setProductId(ItemId);
      setEditedName(loadedProduct.name);
      setEditedPrice(loadedProduct.price);
      setEditedImage(loadedProduct.image);
      setEditedCategory(loadedProduct.categoryId);
      setEditedDescription(loadedProduct.description);
    });
    setFlag(false);
  };

  const updateProduct = (id, name, image, price, category, description) => {
    dispatch(
      onOpenModal({
        text: "Сохранить изменения?",
        onConfirm: async () => {
          try {
            const { err, res } = await dispatch(
              updateProductAsync(
                id,
                name,
                image,
                price,
                category,
                description,
                session
              )
            );
            dispatch(setProductData(res));
            setError(err);
          } catch (error) {
            console.error("Ошибка при обновлении продукта:", error);
            setError("Ошибка при обновлении продукта");
          }

          const loadedProducts = await getProducts();
          dispatch(setProductsAction(loadedProducts));
          dispatch({ type: ACTION_TYPE.CLOSE_MODAL });
          setFlag(!flag);
        },
        onCancel: () => dispatch({ type: ACTION_TYPE.CLOSE_MODAL }),
      })
    );

    setEditedName("");
    setEditedPrice("");
    setEditedImage("");
    setEditedCategory("");
    setEditedDescription("");
    setFlag(true);
  };

  const addProduct = async (name, image, price, category, description) => {
    dispatch(
      onOpenModal({
        text: "Сохранить новый продукт?",
        onConfirm: async () => {
          try {
            const { res, err } = await addProductOperation(
              name,
              image,
              price,
              category,
              description,
              session
            );

            if (err) {
              setError(err);
            } else {
              dispatch(setProductData(res));
              const loadedProducts = await getProducts();
              dispatch(setProductsAction(loadedProducts));
              setProd((prevProducts) => [res, ...prevProducts]);
            }
          } catch (error) {
            console.error("Ошибка при добавлении продукта:", error);
            setError("Ошибка при добавлении продукта");
          } finally {
            dispatch({ type: ACTION_TYPE.CLOSE_MODAL });

            setEditedName("");
            setEditedPrice("");
            setEditedImage("");
            setEditedCategory("");
            setEditedDescription("");
          }
        },
        onCancel: () => dispatch({ type: ACTION_TYPE.CLOSE_MODAL }),
      })
    );
  };

  const deleteProduct = (productId) => {
    dispatch(
      onOpenModal({
        text: "Удалиь продукт?",
        onConfirm: async () => {
          try {
            const { err, res } = await deleteProductOperaton(
              productId,
              session
            );
            if (err) {
              setError(err);
            } else {
              setProd((prevProducts) =>
                prevProducts.filter((prod) => prod.id !== productId)
              );

              const loadedProducts = await getProducts();
              dispatch(setProductsAction(loadedProducts));
            }
          } catch (error) {
            console.log(error);
          } finally {
            dispatch({ type: ACTION_TYPE.CLOSE_MODAL });
          }
        },
        onCancel: () => dispatch({ type: ACTION_TYPE.CLOSE_MODAL }),
      })
    );
  };

  const onCategoryChange = ({ target }) => {
    setEditedCategory(target.value);
  };

  return (
    <>
      <Error arrayAccess={[ROLE.ADMIN]} error={error}>
        <div className={styles.container}>
          <div className={styles.newProduct}>
            <div className={styles.text}>
              Блок для добавления и редактирования товара
            </div>
            <input
              value={editedName}
              onChange={({ target }) => setEditedName(target.value)}
            />
            <input
              value={editedImage}
              onChange={({ target }) => setEditedImage(target.value)}
            />
            <input
              value={editedPrice}
              onChange={({ target }) => setEditedPrice(target.value)}
            />
            <div className="role-column">
              <select value={editedCategory} onChange={onCategoryChange}>
                {categories.map(({ id: categoryId, category }) => (
                  <option key={categoryId} value={categoryId}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <input
              value={editedDescription}
              onChange={({ target }) => setEditedDescription(target.value)}
            />
            <div className={styles.buttons}>
              {flag ? (
                <button
                  className={styles.btn}
                  onClick={() =>
                    addProduct(
                      editedName,
                      editedImage,
                      editedPrice,
                      editedCategory,
                      editedDescription
                    )
                  }
                >
                  add
                </button>
              ) : (
                <button
                  className={styles.btn}
                  onClick={() =>
                    updateProduct(
                      productId,
                      editedName,
                      editedImage,
                      editedPrice,
                      editedCategory,
                      editedDescription
                    )
                  }
                >
                  save
                </button>
              )}
            </div>
          </div>

          <div className={styles.edit}>
            {prod.map((item) => (
              <ProductRow
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.image}
                price={item.price}
                categoryId={item.categoryId}
                description={item.description}
                editProduct={() => editProduct(item.id)}
                deleteProduct={() => deleteProduct(item.id)}
              />
            ))}
          </div>
        </div>
      </Error>
    </>
  );
};
