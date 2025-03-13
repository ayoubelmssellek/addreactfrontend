import React from 'react'
import styles from'./ExploreMenu.module.css'
import { menu_list } from '../../../Admin/assets/assets'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const ExploreMenu = () => {
  const listQatigorie=useSelector(state=>state.admin.ListeCategory)

  return (
    <div className={styles['Explore-menu']}>
        <h1>القائمة</h1>
        <div className={styles["Explore-menu-list"]}>
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
