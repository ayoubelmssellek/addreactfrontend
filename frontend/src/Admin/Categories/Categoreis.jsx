import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import { TiPlus } from 'react-icons/ti';
import { UPDATE_CATEGORY_STATUS,EditState } from '../Redux/Action'; // Corrected action type
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

const Categories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const categories = useSelector((state) => state.admin.ListeCategory); // Get Categories from Redux store
  const dispatch = useDispatch();
  const { role } = useParams();

  const handleSidebarStateChange = (newState) => {
      setIsOpen(newState);
  };

  const handleChangeCategoryStatus = (name, status) => {
      
      dispatch(UPDATE_CATEGORY_STATUS(name, status)); // Dispatch the action
      dispatch(
        EditState(
            name,status
        )
      )
  };

  return (
      <div className="content">
          <Sidebar isOpen={isOpen} onSidebarStateChange={handleSidebarStateChange} />
          <div className={`all-badges  ${isOpen ? 'push-main-content' : 'ml-20'}`}>
              <Navbar pagePath="Categories" />
              <div className="pages">
                
                      <div className="Filter-Add-ListEmployees">
                          <div>
                              <Link to={`/admin/Dashboard/${role}/AddCategory`}>
                                  <TiPlus size={30} color="#1A73E8" className="menu-icon" />
                              </Link>
                          </div>
                          <table className="products-table">
                              <thead>
                                  <tr>
                                      <th>Category</th>
                                      <th>Status</th>
                                      <th>Action</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {categories.map((infoCategory, index) => (
                                      <tr key={index}>
                                          <td>{infoCategory.menu_name}</td>
                                          <td>
                                              <select
                                                  value={infoCategory.statu} // Use Redux state directly
                                                  onChange={(e) => handleChangeCategoryStatus(infoCategory.menu_name, e.target.value)}
                                                  aria-label="Change category Status"
                                              >
                                                  <option value="available">Available</option>
                                                  <option value="out_of_stock">out_of_stock</option>
                                              </select>
                                          </td>
                                          <td>
                                              <div className="dropdown">
                                                  <Link
                                                      to={`/admin/Dashboard/${role}/ViewCategoryDetails/${infoCategory.menu_name}`}
                                                      aria-label="View Order Details"
                                                  >
                                                      <FaEye size={20} color="#2196F3"/>
                                                  </Link>
                                              </div>
                                          </td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                
                      <div>
                          <h3>You dont have any categories.</h3>
                      </div>
                  
              </div>
          </div>
      </div>
  );
};


export default Categories;