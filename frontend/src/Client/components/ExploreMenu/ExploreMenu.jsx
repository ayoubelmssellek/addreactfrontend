import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
import { Link } from 'react-router-dom'
const ExploreMenu = () => {
  

  return (
    <div className='Explore-menu'>
        <h1>القائمة</h1>
        <div className="Explore-menu-list">
        {menu_list.map((item, index) => (
  <Link to={`/category/${item.menu_name}`} key={index}> 
    <div>
      <img src={item.menu_image} alt={item.menu_name} />
      <p>{item.menu_name}</p>
    </div>
  </Link>
))}


        </div>
      
    </div>
  )
}

export default ExploreMenu
