import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../Navbar/Navbar';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { TiPlus } from "react-icons/ti";
import { Link } from 'react-router-dom';
import { DeleteEmployee } from '../../Redux/Action';
import AddEmployees from '../AddEmployee/AddEmployee';
import UpdateEmployees from '../UpdateEmployee/UpdateEmployees';
import Modal from '../../Modal/Modal';
import './Employees.css';

const Employees = () => {
    const [isOpen, setIsOpen] = useState(false);
    const Empls = useSelector((state) => state.admin.Employees); // Get employees from Redux store
    const [showAddModal, setShowAddModal] = useState(false); // State for Add Employee modal
    const [showUpdateModal, setShowUpdateModal] = useState(false); // State for Update Employee modal
    const [selectedEmployee, setSelectedEmployee] = useState(null); // State to store the selected employee for editing
    
    const dispatch = useDispatch();

    const [searchByName, setSearchByName] = useState('');
    const [searchByRole, setSearchByRole] = useState('');

    // State to manage count for each employee
    const [counts, setCounts] = useState({});

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

    // Function to increment count for a specific employee
    const increment = (id) => {
        setCounts((prevCounts) => ({
            ...prevCounts,
            [id]: (prevCounts[id] || 0) < 4 ? (prevCounts[id] || 0) + 1 : prevCounts[id],
        }));
    };

    // Function to decrement count for a specific employee
    const decrement = (id) => {
        setCounts((prevCounts) => ({
            ...prevCounts,
            [id]: (prevCounts[id] || 0) > 0 ? (prevCounts[id] || 0) - 1 : prevCounts[id],
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

                                {/* Filter by Role */}
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
                                <button onClick={clearFilters} className="clear-button">
                                    Clear
                                </button>
                            </div>
                            <div style={{ display: 'flex', marginBlock: "20px" }}>
                                <Link onClick={handleAddClick}>
                                    <TiPlus size={30} color='#1A73E8' className="menu-icon" />
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
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <button
                                                        onClick={() => decrement(employee.Id_Employee)}
                                                        disabled={(counts[employee.Id_Employee] || 0) === 0}
                                                        style={{
                                                            padding: '5px 10px',
                                                            fontSize: '20px',
                                                            cursor: (counts[employee.Id_Employee] || 0) === 0 ? 'not-allowed' : 'pointer',
                                                            backgroundColor: (counts[employee.Id_Employee] || 0) === 0 ? '#ccc' : '#007bff',
                                                            color: 'red',
                                                            border: 'none',
                                                            borderRadius: '5px',
                                                            fontWeight: 600
                                                        }}
                                                    >
                                                        -
                                                    </button>

                                                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                                        {counts[employee.Id_Employee] || 0}
                                                    </span>

                                                    <button
                                                        onClick={() => increment(employee.Id_Employee)}
                                                        disabled={(counts[employee.Id_Employee] || 0) === 4}
                                                        style={{
                                                            padding: '5px 10px',
                                                            fontSize: '20px',
                                                            cursor: (counts[employee.Id_Employee] || 0) === 4 ? 'not-allowed' : 'pointer',
                                                            backgroundColor: (counts[employee.Id_Employee] || 0) === 4 ? '#ccc' : '#007bff',
                                                            color: 'green',
                                                            border: 'none',
                                                            borderRadius: '5px',
                                                            fontWeight: 600
                                                        }}
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
                        <div>
                            <h3>You dont have any Employees</h3>
                        </div>
                    )}
                </div>
                {/* Add Employee Modal */}
                <Modal isOpen={showAddModal} onClose={handleCloseAddModal}>
                    <AddEmployees onClose={handleCloseAddModal} />
                </Modal>

                {/* Update Employee Modal */}
                <Modal isOpen={showUpdateModal} onClose={handleCloseUpdateModal}>
                    <UpdateEmployees Code={selectedEmployee?.Id_Employee} employee={selectedEmployee} onClose={handleCloseUpdateModal} />
                </Modal>
            </div>
        </div>
    );
};

export default Employees;