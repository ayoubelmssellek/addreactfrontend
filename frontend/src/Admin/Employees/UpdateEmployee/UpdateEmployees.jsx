import { useSelector,useDispatch } from "react-redux";
import { useParams,useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import Navbar from "../../Navbar/Navbar";
import {EditEmployee } from "../../Redux/Action";
const UpdateEmployees = () => {
    const [isOpen, setIsOpen] = useState(false);
    const Empls = useSelector((state) => state.admin.Employees); // Get products from Redux store
    const { role,Code } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [product, setProduct] = useState(null); // Local state for product data


    const [Name_Employee, setName_Employee] = useState('');
    const [Role_employee, setRole_employee] = useState('');
    const [Salary_Employee, setSalary_Employee] = useState('');
    const [Total_Avence_Employee, setTotal_Avence_Employee] = useState('');
    const [error, setError] = useState('');
  

       // Find the product to update from the Redux store
    useEffect(() => {
    const SelectedEmp = Empls.find((emp) => Number(emp.Id_Employee )=== Number(Code));
    if (SelectedEmp) {
      setProduct(SelectedEmp);
      setName_Employee(SelectedEmp.Name_Employee);
      setRole_employee(SelectedEmp.Role_employee);
      setSalary_Employee(SelectedEmp.Salary_Employee);
      setTotal_Avence_Employee(SelectedEmp.Total_Avence_Employee);

    } else {
        navigate(`/admin/Dashboard/${role}/Products`); // If no product found, redirect
    }
   },[Code, Empls, navigate,role]);

    // Fetching Role from existing Roles
    const Roles = [...new Set(Empls.map((emp) => emp.Role_employee))];
  
   const isFormValid = Name_Employee && Role_employee && Salary_Employee ;
  
  
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
  
        const newEmp = {
            Id_Employee: Code ,
            Name_Employee: Name_Employee,
            Role_employee: Role_employee,
            Salary_Employee: Salary_Employee, 
            Total_Avence_Employee: Total_Avence_Employee
           
        };
         dispatch(EditEmployee(Code,newEmp));
         navigate(`/admin/Dashboard/${role}/Employees`);
    }  
    if (!product) {
        return <div>Loading...</div>; // Show loading state until product is found
      }

  return (
        <div className="content">
            <Sidebar isOpen={isOpen} onSidebarStateChange={handleSidebarStateChange} />
            <div className={`all-badges container ${isOpen ? 'push-main-content' : 'ml-20'}`}>
                <Navbar  pagePath='Update Product'/>
                <div className="pages">
                <form className="add-product-form" onSubmit={handleSubmit}>
            <p className="form-title">Update Product</p>
            {error && <span className="error-message">{error}</span>}

            <div className="form-group">
                <input
                    type="text"
                    placeholder="Enter Product Name"
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
                    placeholder="Enter Quantity"
                    value={Salary_Employee}
                    onChange={(e) => setSalary_Employee(e.target.value)}
                />
            </div>

            <div className="form-group">
                <input
                    type="number"
                    placeholder="Enter Quantity"
                    value={Total_Avence_Employee}
                    onChange={(e) => setTotal_Avence_Employee(e.target.value)}
                />
            </div>

            <button
                type="submit"
                className={`submit-button ${isFormValid ? 'active' : 'disabled'}`}
                disabled={!isFormValid}
            >
                Update Employee
            </button>
        </form>
                </div>
            </div>
        </div>
  )
}

export default UpdateEmployees
