import ingredientDetailsStyles from './ingredient-details.module.css';
import { ingredientType } from '../../utils/types.js';
import { useSelector } from 'react-redux';

const IngredientDetails = () => {
  const item = useSelector(state => state.ingredientModalReducer.currentIngredient)
  return (
    <>
      <img className={ingredientDetailsStyles.img} src={item.image_large} alt={`Картинка ${item.name}`} />    
      <p className={`${ingredientDetailsStyles.name} text text-center text_type_main-medium mt-4`}>{item.name}</p>
      <div className={`${ingredientDetailsStyles.consist} mt-8 mb-15`}>
        <div className={ingredientDetailsStyles.kbzhu}>
          <p className="text text_type_main-default text_color_inactive mr-5">Калории,ккал</p>
          <p className="text text_type_digits-default text-center text_color_inactive mt-1">{item.calories}</p>
        </div>
        <div className={ingredientDetailsStyles.kbzhu}>
          <p className="text text_type_main-default text_color_inactive mr-5">Белки, г</p>
          <p className="text text_type_digits-default text-center text_color_inactive mt-1">{item.proteins}</p>
        </div> 
        <div className={ingredientDetailsStyles.kbzhu}>
          <p className="text text_type_main-default text_color_inactive mr-5">Жиры, г</p>
          <p className="text text_type_digits-default text-center text_color_inactive mt-1">{item.fat}</p>
        </div>        
        <div className={ingredientDetailsStyles.kbzhu}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text-center text_color_inactive mt-2">{item.carbohydrates}</p>
        </div>                               
      </div>    
    </>    
  )
}

IngredientDetails.propTypes = {
    item: ingredientType.isRequired
}

export default IngredientDetails;


