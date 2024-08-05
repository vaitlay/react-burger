//import PropTypes from 'prop-types';
import { FC } from 'react'
import priceStyles from './price.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TPrice } from '../../types'

type Tpops = TPrice & {className?: string}
const Price: FC<Tpops> = ({ size, value, iconType }): JSX.Element => {
  return (
    <div className = {`m-1 ${priceStyles.priceContainer}`}>
      <p className = {`text ${size === 'medium' ? 'text_type_digits-medium' : 'text_type_digits-default'} m-3`}>{value}</p>
      < CurrencyIcon type= {iconType? iconType : 'primary' } />
    </div>
    )
  }

export default Price;

// Price.propTypes = {
//   size: PropTypes.string,
//   iconType: PropTypes.string,
//   value : PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number
//   ]).isRequired
// }

