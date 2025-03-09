import { useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import { Delete } from '../Redux/Action';
import { Link } from 'react-router-dom';
import { FaTrash,FaEye,FaEdit } from 'react-icons/fa';
const ViewCategoryDetails = () => {
    const CategoryInfo = useSelector((state) => state.admin.produits);
    const [isOpen, setIsOpen] = useState(false);
    const {nameCategory,role} = useParams();
    const CategoryDetails=CategoryInfo.filter((item)=>item.category==nameCategory)
    const dispatch=useDispatch()

    // Function to update the state when Sidebar changes
    const handleSidebarStateChange = (newState) => {
        setIsOpen(newState);
    };
    
    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure you want to delete this product?");
        if (confirm){
            dispatch(Delete(id)); // Dispatch delete action to Redux
        }
    };
  

    return (
        <div className="content">
        <Sidebar isOpen={isOpen} onSidebarStateChange={handleSidebarStateChange} />
       <div className={`all-badges  ${isOpen ? 'push-main-content' : 'ml-20'}`}>
        <Navbar  pagePath='View More'/>
        <div className="pages">
        <div className="View-More-About-Product">
      
        <div className="table-container">
            <table className="products-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {CategoryDetails.map((item, idx) => (
                        <tr key={idx}>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.price}</td>
                            <td>{item.stock}</td>
                            <td>
                                <img
                                    src={item.image}
                                    alt="img"
                                    title='image'
                                    width={60}
                                    height={60}
                                />
                            </td>
                            <td>
                                <div className="dropdown">
                                    <button className="dropdown-button">...</button>
                                    <div className="dropdown-content">
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

export default ViewCategoryDetails
