import styles from './page.module.css';
import IngredientDetails from '../components/ingredient-details/ingredient-details';

const IngredientPage = () => {
  return (
    <div className={styles.ingredientContainer}>
      <IngredientDetails />
    </div>
  );
}

export default IngredientPage;