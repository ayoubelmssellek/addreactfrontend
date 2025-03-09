import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { EditEmployee } from "../../Redux/Action";
import '../ListEmployees/Employees.css'

const UpdateEmployees = ({ Code, employee, onClose }) => {
    const Empls = useSelector((state) => state.admin.Employees); // Get employees from Redux store
    const dispatch = useDispatch();

    // State to manage form fields
    const [formData, setFormData] = useState({
        Name: '',
        Role: '',
        Salary: '',
        Total_Avence: ''
    });
    
    // Populate form fields when the employee prop changes
    useEffect(() => {
        if (employee) {
            setFormData({
                Name_Employee: employee.Name_Employee || '',
                Role_employee: employee.Role_employee || '',
                Salary_Employee: employee.Salary_Employee || '',
                Total_Avence_Employee: employee.Total_Avence_Employee || ''
            });
        }
    }, [employee]);

    // Fetching unique roles from existing employees
    const Roles = [...new Set(Empls.map((emp) => emp.Role_employee))];

    // Check if the form is valid
    const isFormValid = formData.Name_Employee && formData.Role_employee && formData.Salary_Employee;

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Create the updated employee object
        const updatedEmp = {
            ...employee,
            ...formData
        };

        // Dispatch the update action
        dispatch(EditEmployee(Code, updatedEmp));

        // Close the modal
        onClose();
    };

    return (
        <div className="update-product-form">
            <form className="add-employee" onSubmit={handleSubmit}>
                <p className="title">Update Employee</p>

                {/* Name Input */}
                <label>
                    <input
                        type="text"
                        name="Name_Employee"
                        placeholder="Enter Employee Name"
                        value={formData.Name_Employee}
                        onChange={handleInputChange}
                        required
                    />
                </label>

                {/* Role Select */}
                <label>
                    <select
                        name="Role_employee"
                        value={formData.Role_employee}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Choose Role</option>
                        {Roles.map((role, index) => (
                            <option key={index} value={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                </label>

                {/* Salary Input */}
                <label>
                    <input
                        type="number"
                        name="Salary_Employee"
                        placeholder="Enter Employee Salary"
                        value={formData.Salary_Employee}
                        onChange={handleInputChange}
                        required
                    />
                </label>

                {/* Total Advance Input */}
                <label>
                    <input
                        type="number"
                        name="Total_Avence_Employee"
                        placeholder="Enter Total Advance"
                        value={formData.Total_Avence_Employee}
                        onChange={handleInputChange}
                    />
                </label>

                {/* Action Buttons */}
                <div className='action-and-cancel-btn'>
                    <button className="update-product-btn" type="submit" disabled={!isFormValid}>
                        Update Employee
                    </button>
                    <button className="cancel-product-btn" type="button" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateEmployees;

UpdateEmployees.propTypes = {
    employee: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    Code: PropTypes.number.isRequired,
};