import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../Navbar/Navbar';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { TiPlus } from "react-icons/ti";
import { Link } from 'react-router-dom';
import { DeleteEmployee } from '../../Redux/Action';
import './Employees.css'
const Employees = () => {
    const [isOpen, setIsOpen] = useState(false);
    const Empls = useSelector((state) => state.admin.Employees); // Get products from Redux store
    const { role } = useParams();
    const dispatch = useDispatch();

    const [searchByName,setSearchByName]=useState('')
    const [searchByRole,setSearchByRole]=useState('')
   
    // Filter Employees for name and role
    const FiltringEmpls = Empls.filter((emp) => {
        const matchesName = emp.Name_Employee.toLowerCase().includes(searchByName.toLowerCase());
        const matchesRple = emp.Role_employee.toLowerCase().includes(searchByRole.toLowerCase());
        return matchesName && matchesRple; // Show Employees that match both name and role filters
    });

    // Function to update the state when Sidebar changes
    const handleSidebarStateChange = (newState) => {
        setIsOpen(newState);
    };

    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure you want to delete this Employee?");
        if (confirm) {
            dispatch(DeleteEmployee(id)); // Dispatch delete action to Redux
        }
    };

    // Function to clear all filters
    const clearFilters = () => {
        setSearchByName('');
        setSearchByRole('');
    };
  return (
    <div className="content">
    <Sidebar isOpen={isOpen} onSidebarStateChange={handleSidebarStateChange} />
    <div className={`all-badges container ${isOpen ? 'push-main-content' : 'ml-20'}`}>
        <Navbar  pagePath='Employees'/>
        <div className="pages">
            {
               Empls.length !==0 ? 
               <div className='Filter-Add-ListEmployees'>
                        <div className="filters-container">
                            {/* Filter by Name */}
                            <div className="filter-input">
                                <input
                                    type="text"
                                    placeholder=" "
                                    value={searchByName}
                                    onChange={(e) => setSearchByName(e.target.value)}
                                />
                                <label>Filter by Name</label>
                            </div>

                            {/* Filter by Category */}
                            <div className="filter-input">
                                <input
                                    type="text"
                                    placeholder=" "
                                    value={searchByRole}
                                    onChange={(e) => setSearchByRole(e.target.value)}
                                />
                                <label>Filter by Role</label>
                            </div>


                            {/* Clear Filters Button */}
                            <button
                                onClick={clearFilters}
                                className="clear-button"
                            >
                                Clear
                            </button>
                        </div>
                        <div>
                            <Link to={`/admin/Dashboard/${role}/AddEmployees`}>
                              <TiPlus size={30} color='#1A73E8' className="menu-icon" />
                            </Link>
                        </div>
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th>Name_Employee</th>
                                <th>Role_employee</th>
                                <th>Salary_employee</th>
                                <th>Total_Avence_employee</th>
                                <th>Current_Employee_Salary</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {FiltringEmpls.map((employee, idx) =>(
                                <tr key={idx}>
                                    <td>{employee.Name_Employee}</td>
                                    <td>{employee.Role_employee}</td>
                                    <td>{employee.Salary_Employee} DH</td>
                                    <td>{employee.Total_Avence_Employee} DH</td>
                                    <td>{employee.Salary_Employee-employee.Total_Avence_Employee} DH</td>
                                    <td>
                                    <div className="dropdown">
                                            <button className="dropdown-button">...</button>
                                            <div className="dropdown-content">
                                                <Link onClick={() => handleDelete(employee.Id_Employee)}>
                                                    <FaTrash size={20} color="#F44336" />
                                                </Link>
                                                <Link to={`/admin/Dashboard/${role}/UpdateEmployees/${employee.Id_Employee}`}>
                                                    <FaEdit size={20} color="#4CAF50" />
                                                </Link>
                                            </div>
                                    </div>
                                    </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table> 
               </div>
               :
                <div>
                    <h3>
                        You dont have any Employees
                    </h3>
                </div>
            }
        </div>
    </div>
</div>
  )
}

export default Employees
