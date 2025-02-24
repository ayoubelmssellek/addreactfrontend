import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddEmployee } from '../../Redux/Action';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../Navbar/Navbar';
import Notifiication from '../../Notification/Notifiication';
const AddEmployees = () => {
    const [isOpen, setIsOpen] = useState(false);
    const Empls = useSelector((state) => state.admin.Employees); // Get products from Redux store
    const { role } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [Name_Employee, setName_Employee] = useState('');
    const [Role_employee, setRole_employee] = useState('');
    const [Salary_Employee, setSalary_Employee] = useState('');
    const [Total_Avence_Employee, setTotal_Avence_Employee] = useState(0);
    const [error, setError] = useState('');
  
    // Fetching Role from existing Roles
    const Roles = [...new Set(Empls.map((emp) => emp.Role_employee))];

    const isFormValid = Name_Employee && Role_employee && Salary_Employee  ;
  
  
      // Function to update the state when Sidebar changes
        const handleSidebarStateChange = (newState) => {
          setIsOpen(newState);
      };
  
  
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
        navigate(`/admin/Dashboard/${role}/Employees`);
    };
  return (
            <div className="content">
                <Sidebar isOpen={isOpen} onSidebarStateChange={handleSidebarStateChange} />
                <div className={`all-badges container ${isOpen ? 'push-main-content' : 'ml-20'}`}>
                    <Navbar  pagePath='Add Employee'/>
                    <div className="pages">
                    <form className="add-product-form" onSubmit={handleSubmit}>
                <p className="form-title">Add Employee</p>
                {error && <span className="error-message">{error}</span>}
    
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Enter Employee Name"
                        value={Name_Employee}
                        onChange={(e) => setName_Employee(e.target.value)}
                    />
                </div>

    
                <div className="form-group">
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
            </div>
    
                <div className="form-group">
                    <input
                        type="number"
                        placeholder="Enter Employee Salary"
                        value={Salary_Employee}
                        onChange={(e) => setSalary_Employee(e.target.value)}
                    />
                </div>
                    
                <div className="form-group">
                    <input
                        type="number"
                        placeholder="Enter Employee Salary"
                        value={Total_Avence_Employee}
                        onChange={(e) => setTotal_Avence_Employee(e.target.value)}
                    />
                </div>
    
                <button
                    type="submit"
                    className={`submit-button ${isFormValid ? 'active' : 'disabled'}`}
                    disabled={!isFormValid}
                >
                    Add Employee
                </button>
            </form>
                    </div>
                </div>
            </div>
  )
}

export default AddEmployees
