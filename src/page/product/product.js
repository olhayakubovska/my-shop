import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./product.module.css";
import { getProductOperation } from "../../api/operations";
import { addProductInBasket } from "../../api/action";
import { Search } from "../../components";
import { ProductsCards } from "../products-cards/poducts-cards";
import { addProductToBasketOperation } from "../../api/operations/add-product-to-basket-operation";

export const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  // const [productsBeforeSearch, setProductsBeforeSearch] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState("");

  const userId = useSelector(({ user }) => user.id);

  const productsFromRedax = useSelector(({ products }) => products.products);
  // const dispatch = useDispatch();

  useEffect(() => {
    getProductOperation(id).then((loadedProduct) => {
      setProduct(loadedProduct);
    });
  }, [id]);

  const productsToDisplay = () => {
    let products = productsFromRedax;

    // products = products.filter((product) => {
    //   return selectedCategoryId
    //     ? product.categoryId === selectedCategoryId
    //     : true;
    // });

    products = products.filter((product) => {
      return searchPhrase
        ? product.name.toLowerCase().includes(searchPhrase.toLowerCase())
        : true;
    });

    // products = products.sort((a, b) => {
    //   if (selectedSort === "asc") {
    //     return a.price - b.price;
    //   } else {
    //     return b.price - a.price;
    //   }
    // });

    return products;
  };

  const addToCart = (id2) => {
    addProductToBasketOperation(
      userId,
      id2,
      product.image,
      product.name,
      product.price,
      product.description
    );

    // dispatch(addProductInBasket({ userId, product }));

    // const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    // const { image, name, price, description } = product;
    // currentCart.push({ id, userId,  image, name, price, description ,quantity: 1 });

    // localStorage.setItem("cart", JSON.stringify(currentCart));
    // // let cartLength = currentCart.length;

    // console.log(cartLength, "длина");
  };
  // console.log("product123", product);

  // const productsUs = useSelector(({ basket }) => basket.baskets);
  // console.log(productsUs, "productsUser");

  return (
    <>
      <Search setSearchPhrase={setSearchPhrase} searchPhrase={searchPhrase} />

      {searchPhrase ? (
        <div className={styles.products}>
          {productsToDisplay().map(
            ({ id, name, image, price, categoryId, description }) => (
              <ProductsCards
                key={id}
                id={id}
                name={name}
                image={image}
                price={price}
                categoryId={categoryId}
                description={description}
              />
            )
          )}
        </div>
      ) : (
        <div className={styles.product}>
          <div className={styles.productImg}>
            <img src={product.image} alt={product.name} />
          </div>
          <div className={styles.info}>
            <div className={styles.productName}>{product.name}</div>
            <div className={styles.price}>Цена: ${product.price}</div>
            <div className={styles.categoryId}>Количество: 10</div>
            <div className={styles.description}>
              Описание: {product.description}
            </div>
          </div>
          <div className={styles.btnAndId}>
            <button className={styles.btn} onClick={() => addToCart(id)}>
              добавить в корзину
            </button>
            <div className={styles.idProduct}> {id}</div>
          </div>
          {/* <Link to={`/product/edit`}>
      <div className={styles.edit}>
        <i className="fa fa-pencil" aria-hidden="true"></i>
      </div>
    </Link> */}
        </div>
      )}
    </>
  );
};
// return (
//   <>
//     {/* <div>
//       {isEditing ? (
//         <>
//           <ProductForm products={products} />
//         </>
//       ) : (
//         <ProductContent product={product} id={id} />
//       )}

//     </div> */}
//     <ProductContent product={product} id={id} />
//   </>
// );
// <Search setSearchPhrase={setSearchPhrase} searchPhrase={searchPhrase} />

//   {searchPhrase ? (
//     <div className={styles.products}>
//       {productsBeforeSearch.map(
//         ({ id, name, image, price, categoryId, description }) => (
//           <ProductsCards
//             key={id}
//             id={id}
//             name={name}
//             image={image}
//             price={price}
//             categoryId={categoryId}
//             description={description}
//           />
//         )
//       )}
//     </div>
//   ) : (

//   )}
