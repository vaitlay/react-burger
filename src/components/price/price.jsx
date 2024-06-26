import PropTypes from 'prop-types';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import priceStyles from './price.module.css';


const Price = ( {size, value, iconType} ) => {
  return (
    <div className = {`m-1 ${priceStyles.priceContainer}`}>
      <p className = {`text ${size === 'medium' ? 'text_type_digits-medium' : 'text_type_digits-default'} m-3`}>{value}</p>
      < CurrencyIcon type= {iconType} />
    </div>
    )
  }



Price.propTypes = {
  size: PropTypes.string,
  iconType: PropTypes.string,
  value : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
}

export default Price;