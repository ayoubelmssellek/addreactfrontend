import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../Navbar/Navbar';
import { FaTrash, FaEdit,FaTimes } from 'react-icons/fa';
import { BsPersonFillAdd } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { DeleteEmployee } from '../../Redux/Action';
import AddEmployees from '../AddEmployee/AddEmployee';
import UpdateEmployees from '../UpdateEmployee/UpdateEmployees';
import Modal from '../../Modal/Modal';
import '../ListEmployees/Employees.css';
import { LuChevronsUpDown } from "react-icons/lu";


const Employees = () => {
    const [isOpen, setIsOpen] = useState(false);
    const Empls = useSelector((state) => state.admin.Employees);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    
    const dispatch = useDispatch();
    const [searchByName, setSearchByName] = useState('');
    const [searchByRole, setSearchByRole] = useState('');
    const [counts, setCounts] = useState({});

    // Get unique names and roles for filters
    const uniqueNames = [...new Set(Empls.map(emp => emp.Name_Employee))];
    const uniqueRoles = [...new Set(Empls.map(emp => emp.Role_employee))];

    const FiltringEmpls = Empls.filter((emp) => {
        const matchesName = searchByName ? emp.Name_Employee === searchByName : true;
        const matchesRple = searchByRole ? emp.Role_employee === searchByRole : true;
        return matchesName && matchesRple;
    });

    const handleSidebarStateChange = (newState) => setIsOpen(newState);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this Employee?")) {
            dispatch(DeleteEmployee(id));
        }
    };

    const clearFilters = () => {
        setSearchByName('');
        setSearchByRole('');
    };

    const increment = (id) => {
        setCounts(prev => ({
            ...prev,
            [id]: (prev[id] || 0) < 4 ? (prev[id] || 0) + 1 : prev[id],
        }));
    };

    const decrement = (id) => {
        setCounts(prev => ({
            ...prev,
            [id]: (prev[id] || 0) > 0 ? (prev[id] || 0) - 1 : prev[id],
        }));
    };

        // Function to handle Add Employee button click
        const handleAddClick = () => {
            setShowAddModal(true); // Show the Add Employee modal
        };
    
        // Function to handle Edit Employee button click
        const handleEditClick = (employee) => {
            setSelectedEmployee(employee); // Set the selected employee for editing
            setShowUpdateModal(true); // Show the Update Employee modal
        };
    
        // Function to close the Add Employee modal
        const handleCloseAddModal = () => {
            setShowAddModal(false); // Hide the Add Employee modal
        };
    
        // Function to close the Update Employee modal
        const handleCloseUpdateModal = () => {
            setShowUpdateModal(false); // Hide the Update Employee modal
            setSelectedEmployee(null); // Clear the selected employee
        };

    return (
        <div className="content">
            <Sidebar isOpen={isOpen} onSidebarStateChange={handleSidebarStateChange} />
            <div className={`all-badges  ${isOpen ? 'push-main-content' : 'ml-20'}`}>
                <Navbar pagePath='Employees' />
                <div className="pages">
                    {Empls.length !== 0 ? (
                        <div className='ListEmployees'>
                            <div className="filters-container">
                                {/* Name Filter */}
                                <div className="filter-input">
                                    <select
                                    value={searchByName}
                                    onChange={(e) => setSearchByName(e.target.value)}
                                    className="filter-select"
                                    >
                                    <option value="">All Names</option>
                                    {uniqueNames.map(name => (
                                        <option key={name} value={name}>{name}</option>
                                    ))}
                                    </select>
                                    <LuChevronsUpDown className="select-icon" />
                                </div>

                                {/* Role Filter */}
                                <div className="filter-input">
                                    <select
                                        value={searchByRole}
                                        onChange={(e) => setSearchByRole(e.target.value)}
                                        className="filter-select"
                                    >
                                        <option value="">All Roles</option>
                                        {uniqueRoles.map(role => (
                                            <option key={role} value={role}>{role}</option>
                                        ))}
                                    </select>
                                    <LuChevronsUpDown className="select-icon" />
                                </div>

                                <button onClick={clearFilters} className="clear-button">
                                    <FaTimes /> Clear Filters
                                </button>
                            </div>

                            <div className='Add-Employee-icon'>
                                <Link onClick={handleAddClick}>
                                    <BsPersonFillAdd size={30} color='#1A73E8' className="menu-icon" />

                                </Link>

                            </div>

                            <table className="products-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Salary</th>
                                        <th>Total_Avence</th>
                                        <th>Number_of_Ropot</th>
                                        <th>Current_Salary</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {FiltringEmpls.map((employee, idx) => (
                                        <tr key={idx}>
                                            <td>{employee.Name_Employee}</td>
                                            <td>{employee.Role_employee}</td>
                                            <td>{employee.Salary_Employee} DH</td>
                                            <td>{employee.Total_Avence_Employee} DH</td>
                                            <td>
                                                <div className="count-container">
                                                    <button
                                                        onClick={() => decrement(employee.Id_Employee)}
                                                        disabled={(counts[employee.Id_Employee] || 0) === 0}
                                                        className="count-button decrement"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="count-value">
                                                        {counts[employee.Id_Employee] || 0}
                                                    </span>
                                                    <button
                                                        onClick={() => increment(employee.Id_Employee)}
                                                        disabled={(counts[employee.Id_Employee] || 0) === 4}
                                                        className="count-button increment"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td>
                                                {(employee.Salary_Employee || 0) -
                                                    (employee.Total_Avence_Employee || 0) -
                                                    ((counts[employee.Id_Employee] || 0) * 100)} DH
                                            </td>
                                            <td>
                                                <div className="menu-actions">
                                                    <Link onClick={() => handleDelete(employee.Id_Employee)}>
                                                        <FaTrash size={20} color="#F44336" />
                                                    </Link>
                                                    <Link onClick={() => handleEditClick(employee)}>
                                                        <FaEdit size={20} color="#4CAF50" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="empty-state">
                            <h3>No Employees Found</h3>
                            <p>Click the + icon to add a new employee</p>
                        </div>
                    )}
                </div>

                {/* Modals */}
                <Modal isOpen={showAddModal} onClose={handleCloseAddModal}>
                    <AddEmployees onClose={handleCloseAddModal} />
                </Modal>
                <Modal isOpen={showUpdateModal} onClose={handleCloseUpdateModal}>
                    <UpdateEmployees 
                        Code={selectedEmployee?.Id_Employee} 
                        employee={selectedEmployee} 
                        onClose={handleCloseUpdateModal} 
                    />
                </Modal>
            </div>
        </div>
    );
};

export default Employees;