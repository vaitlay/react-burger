import React from 'react'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import priceStyles from './price.module.css';


class Price extends React.Component{

  render() {
    return (
      <div className = {`m-1 ${priceStyles.priceContainer}`}>
        <p className = {`text ${this.props.size === 'medium' ? 'text_type_digits-medium' : 'text_type_digits-default'} m-3`}>{this.props.value}</p>
        < CurrencyIcon type= {this.props.iconType} />
      </div>
    )
  }
  defaultProps
}

Price.defaultProps = {
    size: "default",
    iconType: "primary",
    value : '9999'
};

export default Price;