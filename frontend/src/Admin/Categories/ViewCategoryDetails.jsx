import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaTrash, FaEye, FaEdit } from 'react-icons/fa';
import styles from '../Categories/ViewCategoryDetails.module.css';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import { Delete } from '../Redux/Action';

const ViewCategoryDetails = () => {
    const CategoryInfo = useSelector((state) => state.admin.produits);
    const [isOpen, setIsOpen] = useState(false);
    const { nameCategory, role } = useParams();
    const CategoryDetails = CategoryInfo.filter((item) => item.category === nameCategory);
    const dispatch = useDispatch();

    const handleSidebarStateChange = (newState) => {
        setIsOpen(newState);
    };
    
    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure you want to delete this product?");
        if (confirm) {
            dispatch(Delete(id));
        }
    };

    return (
        <div className={styles.content}>
            <Sidebar isOpen={isOpen} onSidebarStateChange={handleSidebarStateChange} />
            <div className={`${styles.allBadges} ${isOpen ? styles.pushMainContent : styles.ml20}`}>
                <Navbar pagePath='View More' />
                <div className={styles.pages}>
                    <div className={styles.viewMoreAboutProduct}>
                        <div className={styles.tableContainer}>
                            <table className={styles.productsTable}>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Type</th>
                                        <th>Price</th>
                                        <th>Image</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {CategoryDetails.map((item, idx) => (
                                        <tr key={idx}>
                                            <td>{item.name}</td>
                                            <td>{item.category}</td>
                                            <td>{item.type}</td>
                                            <td>{item.price}</td>
                                            <td>
                                                <img
                                                    src={item.image}
                                                    alt="product"
                                                    title='image'
                                                    width={60}
                                                    height={60}
                                                />
                                            </td>
                                            <td>
                                                <div className={styles.dropdown}>
                                                    <button className={styles.dropdownButton}>...</button>
                                                    <div className={styles.dropdownContent}>
                                                        <Link onClick={() => handleDelete(item._id)}>
                                                            <FaTrash size={20} color="#F44336" />
                                                        </Link>
                                                        <Link to={`/admin/Dashboard/${role}/UpdateSelectedProduct/${item._id}`}>
                                                            <FaEdit size={20} color="#4CAF50" />
                                                        </Link>
                                                        <Link to={`/admin/Dashboard/${role}/ViewMore/${item._id}`}>
                                                            <FaEye size={20} color="#2196F3" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewCategoryDetails;