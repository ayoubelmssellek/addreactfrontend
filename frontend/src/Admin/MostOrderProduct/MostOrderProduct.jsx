import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import { useSelector } from "react-redux";
import './MostOrderProduct.css';

const MostOrderProduct = () => {
    const chartRef = useRef(null);
    const listorders = useSelector((state) => state.admin.orders || []);

    // Extract product names and quantities dynamically
    const productData = listorders.flatMap(order => 
        order.items?.map(item => ({
            name: item.name,
            quantity: 20
        })) || []
    );

    // Aggregate product quantities
    const productQuantities = productData.reduce((acc, item) => {
        acc[item.name] = (acc[item.name] || 0) + item.quantity;
        return acc;
    }, {});
    
    // Prepare data for the chart
    const chartData = {
        series: Object.values(productQuantities), // Quantities as series
        labels: Object.keys(productQuantities),  // Product names as labels
    };

    // Function to limit the number of items
    const limitItems = (series, labels, limit) => {
        return {
            series: series.slice(0, limit),
            labels: labels.slice(0, limit),
        };
    };

    // Chart Options
    const getChartOptions = () => {
        const limitedData = limitItems(chartData.series, chartData.labels, 5); // Limit to 5 items

        return {
            series: limitedData.series,
            colors: ["#1C64F2", "#16BDCA", "#9061F9", "#FF4560", "#FEB019"], // Add more colors if needed
            chart: {
                height: 400,
                width: 450,
                type: "pie",
            },
            stroke: {
                colors: ["white"],
                lineCap: "",
            },
            plotOptions: {
                pie: {
                    labels: {
                        show: true,
                    },
                    size: "100%",
                    dataLabels: {
                        offset: -25,
                    },
                },
            },
            labels: limitedData.labels,
            dataLabels: {
                enabled: true,
                style: {
                    fontFamily: "Inter, sans-serif",
                },
            },
            legend: {
                position: "bottom",
                fontFamily: "Inter, sans-serif",
            
            },
            yaxis: {
                labels: {
                    formatter: function (value) {
                        return value + "%";
                    },
                },
            },
            xaxis: {
                labels: {
                    formatter: function (value) {
                        return value + "%";
                    },
                },
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
            },
        };
    };

    // Render Chart
    useEffect(() => {
        const chartElement = document.getElementById("pie-chart");

        if (chartElement && typeof ApexCharts !== "undefined") {
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            const chart = new ApexCharts(chartElement, getChartOptions());
            chart.render();
            chartRef.current = chart;
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []); // Re-render chart when listorders changes


    return (
        <div className="most-ordered-p">
            <div className="card-header">
                <div className="card-title">Most Ordered Product</div>
                <div>
                    <select>
                        <option value="">Per Day</option>
                        <option value="">Per Week</option>
                        <option value="">Per Month</option>
                    </select>
                </div>
            </div>
            <div className="chart-section" id="pie-chart"></div>
            <div className="card-footer">
                <span>Verses 4:48 PM</span>
                <span>2/28/2025</span>
            </div>
        </div>
    );
};

export default MostOrderProduct;