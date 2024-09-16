import { FC } from 'react'
import priceStyles from './price.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TPrice } from '../../types'

type TProps = TPrice & {className?: string}
const Price: FC<TProps> = ({ size, value, iconType }): JSX.Element => {
  return (
    <div className = {`m-1 ${priceStyles.priceContainer}`}>
      <p className = {`text ${size === 'medium' ? 'text_type_digits-medium' : 'text_type_digits-default'} m-3`}>{value}</p>
      < CurrencyIcon type= {iconType? iconType : 'primary' } />
    </div>
    )
  }

export default Price;


