import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddEmployee } from '../../Redux/Action';
import PropTypes from 'prop-types';

const AddEmployees = ({onClose}) => {
    const Empls = useSelector((state) => state.admin.Employees); // Get products from Redux store
    const dispatch = useDispatch();
  
    const [Name_Employee, setName_Employee] = useState('');
    const [Role_employee, setRole_employee] = useState('');
    const [Salary_Employee, setSalary_Employee] = useState('');
    const [Total_Avence_Employee, setTotal_Avence_Employee] = useState(0);
    const [error, setError] = useState('');
  
    // Fetching Role from existing Roles
    const Roles = [...new Set(Empls.map((emp) => emp.Role_employee))];

    const isFormValid = Name_Employee && Role_employee && Salary_Employee  ;
  
  
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
  
        if (!isFormValid) {
            setError('Please fill all fields');
            return;
        }
  
  
        const newEmployee = {
            Id_Employee: Empls.length > 0 ? Empls[Empls.length - 1].Id_Employee + 1 : 1, // Generate new ID
            Name_Employee: Name_Employee,
            Role_employee: Role_employee,
            Salary_Employee: Salary_Employee,
            Total_Avence_Employee: Total_Avence_Employee
        };
        dispatch(AddEmployee(newEmployee));
        // Close the modal
        onClose();
    };
  return (
 <div className="update-product-form">
    <form className="add-employee" onSubmit={handleSubmit}>
       <p className="title">Add Employee</p>
       {error && <span className="error-message">{error}</span>}

        <label>
        <input
            type="text"
            placeholder="Enter Employee Name"
            value={Name_Employee}
            onChange={(e) => setName_Employee(e.target.value)}
        />
        </label>
        <label>
        <select
            value={Role_employee}
            onChange={(e) => setRole_employee(e.target.value)}
        >
            <option value="">Choose Role</option>
            {Roles.map((category, index) => (
                <option key={index} value={category}>
                    {category}
                </option>
            ))}
        </select>
        </label>
        <label>
        <input
                        type="number"
                        placeholder="Enter Employee Salary"
                        value={Salary_Employee}
                        onChange={(e) => setSalary_Employee(e.target.value)}
                    />
        </label>
        <label>
        <input
                        type="number"
                        placeholder="Enter Employee Salary"
                        value={Total_Avence_Employee}
                        onChange={(e) => setTotal_Avence_Employee(e.target.value)}
                    />
        </label>
        <div className='action-and-cancel-btn'>
               <button className="update-product-btn" type="submit">Add Employee</button>
               <button className="cancel-product-btn" type="submit" onClick={onClose}>cancel</button>
        </div>   
     </form>
</div>
  )
}

export default AddEmployees

AddEmployees.propTypes = {
    onClose: PropTypes.func.isRequired,
};


