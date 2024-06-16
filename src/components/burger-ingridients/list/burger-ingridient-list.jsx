import React from 'react'
import IngridientCard from '../card/ingridient-card.jsx';
import listStyle from './burger-ingridient-list.module.css';
import PropTypes from 'prop-types'



class IngridientList extends React.Component{
  render() {
    return (
      <>
        <h3 className = 'text text_type_main-medium mt-5'>{this.props.type}</h3>
        <div className = {`p-0 ${listStyle.list}`}>
        {this.props.items.map(item => {
          return (
            <div className = 'item' key = {item._id}>
              <IngridientCard  ingridientName = {item.name} imageSrc = {item.image} count = {0} price = {item.price} />
            </div>
          )
        })}
      </div>
      </>
    )
  }
}

const itemTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired
});

IngridientList.propTypes = {
  type: PropTypes.string,
  items: PropTypes.arrayOf(itemTypes).isRequired
}

export default IngridientList;