import { useState } from 'react';
import {useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import { TiPlus } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import styles from './Categories.module.css';

const Categories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const categories = useSelector((state) => state.admin.ListeCategory);
  const Products = useSelector((state) => state.admin.produits);
  
  const { role } = useParams();

  const handleSidebarStateChange = (newState) => {
    setIsOpen(newState);
  };

  



  return (
    <div className={styles.content}>
      <Sidebar isOpen={isOpen} onSidebarStateChange={handleSidebarStateChange} />
      <div className={`${styles.categoriesContainer} ${isOpen ? styles.categoriesContainerPush : styles.categoriesContainerNoPush}`}>
        <Navbar pagePath="Categories" />
        <div className={styles.pages}>
          <div className={styles.categoriesContent}>
            <div className={styles.headerSection}>
              <h2>Product Categories</h2>
              <Link 
                to={`/admin/Dashboard/${role}/AddCategory`}
                className={styles.addCategoryBtn}
              >
                <TiPlus size={24} />
                Add New Category
              </Link>
            </div>

            <div className={styles.categoriesGrid}>
              {categories.map((cat) => (
                <div 
                  key={cat.menu_name}
                  className={`${styles.categoryBadge} `}
                >
                  <div className={styles.badgeHeader}>
                    <img 
                      src={cat.menu_image || 'https://via.placeholder.com/300x180'} 
                      alt={cat.menu_name}
                      className={styles.categoryImage}
                    />
                  </div>

                  <div className={styles.badgeFooter}>
                     <div className={styles.categoryMeta}>
                      <h3>{cat.menu_name}</h3>
                     </div>
                     <div className='Count-And-View'>
                     <span className={styles.productCount}>
                        {
                        Products.filter((count)=>count.category==cat.menu_name).length
                        || 0
                        } products
                      </span>
                    <Link
                      to={`/admin/Dashboard/${role}/ViewCategoryDetails/${cat.menu_name}`}
                      className={styles.viewButton}
                    >
                      <FaEye size={18} />
                    </Link>
                      </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;