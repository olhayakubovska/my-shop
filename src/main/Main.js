import { useEffect, useState } from "react";

import styles from "./main.module.css";
import {
  getCategoriesOperation,
  getProductsOperation,
} from "../api/operations";
import { Categories, Search } from "../components";
import { ProductsCards } from "../page";
import { Pagination } from "../components/Pagitation/Pagination";
import { getLastPageFromLinks } from "../api/operations/get-last-page";
import { getProductsByCategory } from "../api/fetch";

export const Main = () => {
  const [categories, setCategories] = useState([]);
  const [productsFromServer, setProductsFromServer] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [selectedCategoryId, setSelectCategoryId] = useState("");
  const [selectedSort, setSelectSort] = useState("desc");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  // const productsFromRedax = useSelector(({ products }) => products.products);
  // const dispatch = useDispatch();
  const limit = 3;

  useEffect(() => {
    getCategoriesOperation().then((fetchedCategories) => {
      setCategories(fetchedCategories);
    });
    // getProductsOperation(page, limit).then((loadedProducts)=>{

    getProductsOperation().then((loadedProducts) => {
      // dispatch(setProductsAction(loadedProducts));
      setProductsFromServer(loadedProducts);
    });
  }, []);

  useEffect(() => {
    getProductsByCategory(selectedCategoryId, page, limit).then(
      ({ products, links }) => {
        setProductsFromServer(products);
        setLastPage(getLastPageFromLinks(links));
      }
    );
  }, [page]);

  const chooseCategory = (categoryId) => {
    setSelectCategoryId(categoryId);
    getProductsByCategory(categoryId, page, limit).then(
      ({ products, links }) => {
        setProductsFromServer(products);
        setLastPage(getLastPageFromLinks(links));
      }
    );
  };

  const onSort = (type) => {
    setSelectSort(type);
  };

  const productsToDisplay = () => {
    let products = productsFromServer;

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

    products = products.sort((a, b) => {
      if (selectedSort === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    return products;
  };
  console.log(productsFromServer, "productsFromServer");
  return (
    <div className={styles.main}>
      <Search setSearchPhrase={setSearchPhrase} searchPhrase={searchPhrase} />

      <div className={styles.mainSection}>
        <div className={styles.categories}>
          <h2>Категории:</h2>
          <div className={styles.categoryItems}>
            {categories.map(({ id, category }) => (
              <Categories
                category={category}
                key={id}
                onClick={() => chooseCategory(id)}
              />
            ))}
          </div>
        </div>

        <div className={styles.productsSection}>
          <div className={styles.sorting}>
            <select onChange={({ target }) => onSort(target.value)}>
              <option value="desc">Самое дорогое</option>
              <option value="asc">Самое дешевое</option>
            </select>
          </div>

          {
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
          }
        </div>
      </div>
      {selectedCategoryId && (
        <Pagination page={page} setPage={setPage} lastPage={lastPage} />
      )}
    </div>
  );
};

// export const Main = () => {
//   const [categiries, setCategories] = useState([]);
//   const [productsBeforeSearch, setProductsBeforeSearch] = useState([]);
//   const [
//     productsBeforeSearchByCategoryId,
//     setProductsBeforeSearchByCategoryId,
//   ] = useState([]);

//   const [filteredProductsByCategory, setfilteredProductsByCategory] = useState(
//     []
//   );

//   const [searchPhrase, setSearchPhrase] = useState("");

//   const productFromRedax = useSelector(({ products }) => products.products);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     getProductsOperation().then((loadedProducts) => {
//       dispatch(setProductsAction(loadedProducts));
//     });
//     getProductsOperation(searchPhrase).then((fetchedProducts) => {
//       setProductsBeforeSearch(fetchedProducts);
//     });
//   }, [dispatch, searchPhrase]);

//   useEffect(() => {
//     getCategoriesOperation().then((fetchedCategories) => {
//       setCategories(fetchedCategories);
//     });
//   }, []);

//   const [selectCategoryId, setSelectCategoryId] = useState("");

//   const chooseCategory = (categoryId) => {
//     // setSelectCategoryId(categoryId);
//     // getProductsFromServerByCategoryOperation(categoryId).then(
//     //   (loadedProducts) => {
//     //     const productIds = loadedProducts.map((p) => p.productId);
//     //     const filteredProducts = productFromRedax.filter((p) =>
//     //       productIds.includes(p.id)
//     //     );

//     //     setfilteredProductsByCategory(filteredProducts);
//     //   }
//     // );
//     setSelectCategoryId(categoryId);
//     if (searchPhrase) {
//       getProductsByCatrgoryAfterSorting(searchPhrase, categoryId).then(
//         (loadedProducts) => {
//           setProductsBeforeSearchByCategoryId(loadedProducts);
//           console.log(
//             productsBeforeSearchByCategoryId,categoryId,
//             "продукты по категории после сортировки"
//           );

//         }
//       );
//     } else {
//       getProductsFromServerByCategoryOperation(categoryId).then(
//         (loadedProducts) => {
//           const productIds = loadedProducts.map((p) => p.productId);
//           const filteredProducts = productFromRedax.filter((p) =>
//             productIds.includes(p.id)
//           );

//           setfilteredProductsByCategory(filteredProducts);
//         }
//       );
//     }
//   };

//   const [selestProductByPrice, setSelectProductByPrice] = useState([]);
//   const [selectType, setSelectType] = useState("");

//   const onPriceSort = (type) => {
//     setSelectType(type);
//     getSortedProducts("price", type).then((loadedProducts) => {
//       setSelectProductByPrice(loadedProducts);
//     });
//   };

//   const productsToDisplay = () => {
//     if (searchPhrase) {
//       return productsBeforeSearch;
//     } else if (selectCategoryId) {
//       return filteredProductsByCategory;
//     } else if (selectType) {
//       return selestProductByPrice;
//     } else {
//       return productFromRedax;
//     }
//   };

//   return (
//     <div className={styles.main}>
//       <Search setSearchPhrase={setSearchPhrase} searchPhrase={searchPhrase} />

//       <div className={styles.mainSection}>
//         <div className={styles.categories}>
//           <h2>Категории:</h2>

//           <div className={styles.categoryItems}>
//             {categiries.map(({ id, category }) => (
//               <Categories
//                 category={category}
//                 key={id}
//                 onClick={() => chooseCategory(id)}
//               />
//             ))}
//           </div>
//         </div>
//         <div className={styles.productsSection}>
//           <div className={styles.sorting}>
//             <select onChange={({ target }) => onPriceSort(target.value)}>
//               <option value="desc">Самое дорогое</option>

//               <option value="asc">Самое дешевое</option>
//             </select>
//           </div>
//           <div className={styles.products}>
//             {productsToDisplay().map(
//               ({ id, name, image, price, categoryId, description }) => (
//                 <ProductsCards
//                   key={id}
//                   id={id}
//                   name={name}
//                   image={image}
//                   price={price}
//                   categoryId={categoryId}
//                   description={description}
//                 />
//               )
//             )}
//             {/* {productsBeforeSearch.map(
//               ({ id, name, image, price, categoryId, description }) => (
//                 <ProductsCards
//                   key={id}
//                   id={id}
//                   name={name}
//                   image={image}
//                   price={price}
//                   categoryId={categoryId}
//                   description={description}
//                 />
//               )
//             )}

//             {filteredProductsByCategory.map(
//               ({ id, name, image, price, categoryId, description }) => (
//                 <ProductsCards
//                   key={id}
//                   id={id}
//                   name={name}
//                   image={image}
//                   price={price}
//                   categoryId={categoryId}
//                   description={description}
//                 />
//               )
//             )} */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
