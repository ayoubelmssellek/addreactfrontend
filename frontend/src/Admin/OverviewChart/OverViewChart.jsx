import { useEffect } from "react";
import ApexCharts from "apexcharts";
import { FaDollarSign } from "react-icons/fa";
import "./OverViewChart.css";

const OverViewChart = () => {
  // Initialize the chart when the component mounts
  useEffect(() => {
    const options = {
      colors: ["#1A56DB", "#43A047"],
      series: [
        {
          name: "Orders Completed",
          color: "#43A047",
          data: [
            { x: "Mon", y: 52 },
            { x: "Tue", y: 99 },
            { x: "Wed", y: 63 },
            { x: "Thu", y: 121 },
            { x: "Fri", y: 44 },
            { x: "Sat", y: 103 },
            { x: "Sun", y: 94 },
          ],
        },
        {
          name: "Orders",
          color: "#1A56DB",
          data: [
            { x: "Mon", y: 56 },
            { x: "Tue", y: 100 },
            { x: "Wed", y: 76 },
            { x: "Thu", y: 122 },
            { x: "Fri", y: 44 },
            { x: "Sat", y: 111 },
            { x: "Sun", y: 97 },
          ],
        },
      ],
      chart: {
        type: "bar",
        height: "220px",
        fontFamily: "Inter, sans-serif",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "70%",
          borderRadiusApplication: "end",
          borderRadius: 8,
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        style: {
          fontFamily: "Inter, sans-serif",
        },
      },
      states: {
        hover: {
          filter: {
            type: "darken",
            value: 1,
          },
        },
      },
      stroke: {
        show: true,
        width: 0,
        colors: ["transparent"],
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -14,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        floating: false,
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssclassName: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
      fill: {
        opacity: 1,
      },
    };

    if (document.getElementById("column-chart") && typeof ApexCharts !== "undefined") {
      const chart = new ApexCharts(document.getElementById("column-chart"), options);
      chart.render();

      // Cleanup function to destroy the chart when the component unmounts
      return () => {
        chart.destroy();
      };
    }
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="overview-chart-container">
      <div className="header-of-chart">
        <div className="header-left">
          <div className="icon-container">
            <FaDollarSign size={25} />
          </div>
          <div>
            <h5 className="title">1.4k</h5>
            <p className="subtitle">Total Sales per week</p>
          </div>
        </div>
        <div>
          <span className="badge">
            <svg
              className="badge-icon"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13V1m0 0L1 5m4-4 4 4"
              />
            </svg>
            42.5%
          </span>
        </div>
      </div>

      <div id="column-chart"></div>

      <div className="footer">
        <div className="footer-content">
          <button className="filter-button">
            Filter per week
            <svg
              className="filter-icon"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          <a href="#" className="report-link">
            Leads Report
            <svg
              className="report-icon"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default OverViewChart;