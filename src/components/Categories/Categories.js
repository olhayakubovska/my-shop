import styles from "./categories.module.css";

export const Categories = ({ category, onClick }) => {
  return (
    <div className={styles.categoriesContainer} onClick={onClick}>
  {category}
    </div>
  );
};

