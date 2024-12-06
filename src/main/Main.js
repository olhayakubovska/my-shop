// import { useEffect, useState } from "react";

// import styles from "./main.module.css";
// import {
//   getCategoriesOperation,
//   getProductsOperation,
//   getLastPageFromLinks,
// } from "../api/operations";
// import { Categories, Search, Pagination } from "../components";
// import { ProductsCards } from "../page";
// import { getProductsByCategory } from "../api/fetch";

// export const Main = () => {
//   const [categories, setCategories] = useState([]);
//   const [productsFromServer, setProductsFromServer] = useState([]);
//   const [searchPhrase, setSearchPhrase] = useState("");
//   const [selectedCategoryId, setSelectCategoryId] = useState("");
//   const [selectedSort, setSelectSort] = useState("desc");
//   const [page, setPage] = useState(1);
//   const [lastPage, setLastPage] = useState(0);

//   const limit = 3;

//   useEffect(() => {
//     getCategoriesOperation().then((fetchedCategories) => {
//       setCategories(fetchedCategories);
//     });

//     getProductsOperation().then((loadedProducts) => {
//       setProductsFromServer(loadedProducts);
//     });
//   }, []);

//   useEffect(() => {
//     getProductsByCategory(selectedCategoryId, page, limit).then(
//       ({ products, links }) => {
//         setProductsFromServer(products);
//         setLastPage(getLastPageFromLinks(links));
//       }
//     );
//   }, [page]);

//   const chooseCategory = (categoryId) => {
//     setSelectCategoryId(categoryId);
//     getProductsByCategory(categoryId, page, limit).then(
//       ({ products, links }) => {
//         setProductsFromServer(products);
//         setLastPage(getLastPageFromLinks(links));
//       }
//     );
//   };

//   const onSort = (type) => {
//     setSelectSort(type);
//   };

//   const productsToDisplay = () => {
//     let products = productsFromServer;

//     products = products.filter((product) => {
//       return searchPhrase
//         ? product.name.toLowerCase().includes(searchPhrase.toLowerCase())
//         : true;
//     });

//     products = products.sort((a, b) => {
//       if (selectedSort === "asc") {
//         return a.price - b.price;
//       } else {
//         return b.price - a.price;
//       }
//     });

//     return products;
//   };
//   return (
//     <div className={styles.main}>
//       <Search setSearchPhrase={setSearchPhrase} searchPhrase={searchPhrase} />

//       <div className={styles.mainSection}>
//         <div className={styles.categories}>
//           <h2>Категории:</h2>
//           <div className={styles.categoryItems}>
//             {categories.map(({ id, category }) => (
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
//             <select onChange={({ target }) => onSort(target.value)}>
//               <option value="desc">Самое дорогое</option>
//               <option value="asc">Самое дешевое</option>
//             </select>
//           </div>

//           {
//             <div className={styles.products}>
//               {productsToDisplay().map(
//                 ({ id, name, image, price, categoryId, description }) => (
//                   <ProductsCards
//                     key={id}
//                     id={id}
//                     name={name}
//                     image={image}
//                     price={price}
//                     categoryId={categoryId}
//                     description={description}
//                   />
//                 )
//               )}
//             </div>
//           }
//         </div>
//       </div>
//       {selectedCategoryId && (
//         <Pagination page={page} setPage={setPage} lastPage={lastPage} />
//       )}
//     </div>
//   );
// };
import { useEffect, useState } from "react";
import styles from "./main.module.css";
import {
  getCategoriesOperation,
  getProductsOperation,
  getLastPageFromLinks,
} from "../api/operations";
import { Categories, Search, Pagination } from "../components";
import { ProductsCards } from "../page";
import { getProductsByCategory } from "../api/fetch";
import Loader from "../components/Loader/Loader";
export const Main = () => {
  const [categories, setCategories] = useState([]);
  const [productsFromServer, setProductsFromServer] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [selectedCategoryId, setSelectCategoryId] = useState("");
  const [selectedSort, setSelectSort] = useState("desc");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [loading, setLoading] = useState(true); // Добавим состояние загрузки

  const limit = 3;

  useEffect(() => {
    setLoading(true); // Начинаем загрузку данных
    getCategoriesOperation().then((fetchedCategories) => {
      setCategories(fetchedCategories);
      setLoading(false); // Данные загружены, убираем лоадер
    });

    getProductsOperation().then((loadedProducts) => {
      setProductsFromServer(loadedProducts);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      setLoading(true); // Начинаем загрузку продуктов для выбранной категории
      getProductsByCategory(selectedCategoryId, page, limit).then(
        ({ products, links }) => {
          setProductsFromServer(products);
          setLastPage(getLastPageFromLinks(links));
          setLoading(false); // Продукты загружены, убираем лоадер
        }
      );
    }
  }, [page, selectedCategoryId]);

  const chooseCategory = (categoryId) => {
    setSelectCategoryId(categoryId);
    setLoading(true); // Начинаем загрузку продуктов для новой категории
    getProductsByCategory(categoryId, page, limit).then(
      ({ products, links }) => {
        setProductsFromServer(products);
        setLastPage(getLastPageFromLinks(links));
        setLoading(false); // Продукты загружены
      }
    );
  };

  const onSort = (type) => {
    setSelectSort(type);
  };

  const productsToDisplay = () => {
    let products = productsFromServer;

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

  return (
    <div className={styles.main}>
      <Search setSearchPhrase={setSearchPhrase} searchPhrase={searchPhrase} />

      {loading ? ( // Показываем Loader, если идет загрузка
        <Loader />
      ) : (
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
          </div>
        </div>
      )}

      {selectedCategoryId && (
        <Pagination page={page} setPage={setPage} lastPage={lastPage} />
      )}
    </div>
  );
};
