import React from 'react'
import navStyles from './nav-item.module.css';

class NavItem extends React.Component{
  render() {
    return (
      <nav className = ''>
        <a className = {`${navStyles.navItem} p-4`}  href = {this.props.link}>
          {this.props.children}
        </a>
      </nav>
    )
  }
}

export default NavItem;