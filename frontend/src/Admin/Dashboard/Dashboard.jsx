import Sidebar from "../Sidebar/Sidebar";
import { useState } from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import './Dashboard.css';
import Badge from "../Badges/Badges";
import OrderTable from "../OrderTable/OrderTable";
import Navbar from "../Navbar/Navbar";
import OverViewChart from "../OverviewChart/OverViewChart";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to update the state when Sidebar changes
  const handleSidebarStateChange = (newState) => {
    setIsOpen(newState);
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <Sidebar isOpen={isOpen} onSidebarStateChange={handleSidebarStateChange} />
      </div>

      {/* Main Content */}
      <div className={`main-content ${isOpen ? 'push-main-content' : 'ml-20'}`}>
        <Navbar pagePath='Dashboard' />

        <div className="first-section">
          <div className="card">
            <Badge />
          </div>
          <div className="orders-table">
            <OrderTable />
          </div>
        </div>

        <div className="second-section">
          <div className="orders-and-sales-chart">
            <OverViewChart />
          </div>
          <div className="card">
            {/* Additional content can go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;