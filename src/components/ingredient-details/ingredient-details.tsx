import ingredientDetailsStyles from './ingredient-details.module.css';
import { TIngredientItem } from '../../types'

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { loadIngredientsData } from '../../services/actions/load-ingredients-data';
import NotFound404 from '../../pages/not-found'

const IngredientDetails = (): JSX.Element => {
  
  const dispatch = useDispatch();
  const { _id } = useParams();
  const currentItem = useSelector((state: any) => state.ingredientModalReducer.currentIngredient as TIngredientItem); //Позже доделать типизацию для redux 
  const ingredientsData = useSelector((state: any) => state.loadIngredientsReducer.ingredientsData as TIngredientItem[]); //Позже доделать типизацию для redux 
  const itemFromRoute = ingredientsData.find(ingr => ingr._id === _id);


  useEffect(() => {
    if (!currentItem._id) dispatch(loadIngredientsData() as any) //Позже доделать типизацию для redux 
  },[]);



  const item = currentItem._id ? currentItem : itemFromRoute;
  if (!item) return <NotFound404/>

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

export default IngredientDetails;

