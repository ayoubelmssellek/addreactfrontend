import { FaPizzaSlice, FaBurger } from "react-icons/fa6";
import { GiSandwich, GiNoodles } from "react-icons/gi";
import { LuSalad } from "react-icons/lu";
import { RiDrinks2Fill } from "react-icons/ri";
import { TbMeat } from "react-icons/tb";
import { Utensils } from "lucide-react";
import { useSelector } from "react-redux";
import "../SalesCharts/SalesCharts.css";

const ChartComponent = () => {
  const Category = useSelector((state) => state.admin.ListeCategory); // Get ListeCategory from Redux store

  return (
    <div className="Sales-grid">
      <div className="Sales-card">
        <div className="Sales-icons ">
          <FaPizzaSlice size={50} color="orange" />
        </div>
        <div>
          <p className="Sales-label">Pizza</p>
          <p className="Sales-value">237k</p>
        </div>
      </div>
      <div className="Sales-card">
        <div className="Sales-icons">
          <FaBurger size={50} color="orange" />
        </div>
        <div>
          <p className="Sales-label">Burger</p>
          <p className="Sales-value">150k</p>
        </div>
      </div>
      <div className="Sales-card">
        <div className="Sales-icons ">
          <GiSandwich size={50} color="orange" />
        </div>
        <div>
          <p className="Sales-label">Sandwich</p>
          <p className="Sales-value">120k</p>
        </div>
      </div>
      <div className="Sales-card">
        <div className="Sales-icons ">
          <GiNoodles size={50} color="orange" />
        </div>
        <div>
          <p className="Sales-label">Noodles</p>
          <p className="Sales-value">80k</p>
        </div>
      </div>
      <div className="Sales-card">
        <div className="Sales-icons ">
          <LuSalad size={50} color="green" />
        </div>
        <div>
          <p className="Sales-label">Salad</p>
          <p className="Sales-value">90k</p>
        </div>
      </div>
      <div className="Sales-card">
        <div className="Sales-icons ">
          <RiDrinks2Fill size={50} color="orange" />
        </div>
        <div>
          <p className="Sales-label">Drinks</p>
          <p className="Sales-value">200k</p>
        </div>
      </div>
      <div className="Sales-card">
        <div className="Sales-icons ">
          <TbMeat size={50} color="brown" />
        </div>
        <div>
          <p className="Sales-label">Meat</p>
          <p className="Sales-value">100k</p>
        </div>
      </div>
      <div className="Sales-card">
        <div className="Sales-icons ">
          <Utensils size={50} color="orange" />
        </div>
        <div>
          <p className="Sales-label">Utensils</p>
          <p className="Sales-value">50k</p>
        </div>
      </div>
      <div className="Sales-card">
        <div className="Sales-icons ">
          <Utensils size={50} color="orange" />
        </div>
        <div>
          <p className="Sales-label">Utensils</p>
          <p className="Sales-value">50k</p>
        </div>
      </div>
      <div className="Sales-card">
        <div className="Sales-icons ">
          <Utensils size={50} color="orange" />
        </div>
        <div>
          <p className="Sales-label">Utensils</p>
          <p className="Sales-value">50k</p>
        </div>
      </div>
      <div className="Sales-card">
        <div className="Sales-icons ">
          <Utensils size={50} color="orange" />
        </div>
        <div>
          <p className="Sales-label">Utensils</p>
          <p className="Sales-value">50k</p>
        </div>
      </div>
      <div className="Sales-card">
        <div className="Sales-icons ">
          <Utensils size={50} color="orange" />
        </div>
        <div>
          <p className="Sales-label">Utensils</p>
          <p className="Sales-value">50k</p>
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;