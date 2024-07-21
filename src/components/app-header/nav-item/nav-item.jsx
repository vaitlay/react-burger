import React from 'react'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'
import navStyles from './nav-item.module.css';

const NavItem = ({ link, children }) => {
  return (
    <NavLink 
      to={link}
      className = {({ isActive }) => isActive ? `${navStyles.navItem} p-4` : `${navStyles.navItem} p-4 text_color_inactive`} 
    >
      {children}    
    </NavLink> 
  )
}

NavItem.propTypes = {
  link: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element)
}



export default NavItem;








// return (
//   <nav className = ''>
//     <a className = {`${navStyles.navItem} p-4`}  href = {link}>
//       {children}
//     </a>
//   </nav>
// )