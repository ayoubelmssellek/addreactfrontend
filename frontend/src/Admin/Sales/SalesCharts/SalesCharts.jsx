import '../SalesCharts/SalesCharts.css';

const SalesDonutChart = () => {
  // Chart dimensions (shared for both charts)
  const size = 240;
  const strokeWidth = 18;
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const gap = 0.04;

  // Data definitions
  const Categories = [
    { category: 'Tacos', value: 2450 },
    { category: 'Chawarma', value: 1830 },
    { category: 'Paninis', value: 920 },
    { category: 'Jus', value: 920 },
    { category: 'Penzarotti', value: 920 },
    { category: 'Chikas', value: 920 },
    { category: 'Pasticcio', value: 920 },
    { category: 'Salades', value: 920 },
    { category: 'Pats', value: 560 }
  ];

  const Types = [
    { Type: 'Poulet', value: 2450 },
    { Type: 'Nogget', value: 1830 },
    { Type: 'Vh', value: 920 },
    { Type: 'Thone', value: 920 },
    { Type: 'Jambon', value: 920 },
    { Type: 'Mixte', value: 920 },
    { Type: 'fruit_de_mer', value: 560 }
  ];

  // Color mappings
  const categoryColors = {
    Tacos: '#4f46e5',
    Chawarma: '#eab308',
    Paninis: '#7ff69c',
    Jus: '#d81891',
    Penzarotti: '#6a1627',
    Chikas: '#0d9488',
    Pasticcio: '#e84b55',
    Salades: '#0dac35',
    Pats: '#2d83ff'
  };

  const typeColors = {
    Poulet: '#4f46e5',
    Nogget: '#eab308',
    Vh: '#0d9488',
    Thone: '#6a1627',
    Jambon: '#d81891',
    Mixte: '#0dac35',
    fruit_de_mer: '#2d83ff'
  };

  // Generic segment calculation function
  const getSegmentData = (items, totalValue) => (value, index) => {
    const totalGaps = items.length === 1 ? 0 : items.length * gap;
    const availableCircumference = circumference * (1 - totalGaps);
    const prevSegments = items.slice(0, index).reduce((acc, item) => acc + item.value, 0);
    
    const gapOffset = index * gap * circumference;
    const valueOffset = (prevSegments / totalValue) * availableCircumference;
    const segmentLength = (value / totalValue) * availableCircumference;

    return {
      strokeDasharray: `${segmentLength} ${circumference}`,
      strokeDashoffset: -(gapOffset + valueOffset),
      transform: 'rotate(-90deg)'
    };
  };

  // Calculate totals
  const categoryTotal = Categories.reduce((acc, item) => acc + item.value, 0);
  const typeTotal = Types.reduce((acc, item) => acc + item.value, 0);

  // Create segment generators
  const getCategorySegment = getSegmentData(Categories, categoryTotal);
  const getTypeSegment = getSegmentData(Types, typeTotal);

  return (
    <div className="sales-donut-container">      
      {/* Categories Chart */}
      <div className="chart-content">
        <svg width={size} height={size} className="donut-svg">
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
          />
          
          {Categories.map((item, index) => (
            <circle
              key={item.category}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={categoryColors[item.category]}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              {...getCategorySegment(item.value, index)}
            />
          ))}
          <text
            x={center}
            y={center}
            className="donut-total"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            Categories
          </text>
        </svg>

        <div className="sales-legend">
          {Categories.map((item) => (
            <div key={item.category} className="legend-item">
              <span 
                className="legend-color" 
                style={{ backgroundColor: categoryColors[item.category] }}
              />
              <div className="legend-info">
                <span className="legend-category">{item.category}</span>
                <span className="legend-sales">
                  {item.value.toLocaleString()} sales
                  <span className="legend-percentage">
                    ({((item.value / categoryTotal) * 100).toFixed(1)}%)
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Types Chart */}
      <div className="chart-content">
        <svg width={size} height={size} className="donut-svg">
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
          />
          
          {Types.map((item, index) => (
            <circle
              key={item.Type}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={typeColors[item.Type]}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              {...getTypeSegment(item.value, index)}
            />
          ))}

          <text
            x={center}
            y={center}
            className="donut-total"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            Types
          </text>
        </svg>

        <div className="sales-legend">
          {Types.map((item) => (
            <div key={item.Type} className="legend-item">
              <span 
                className="legend-color" 
                style={{ backgroundColor: typeColors[item.Type] }}
              />
              <div className="legend-info">
                <span className="legend-category">{item.Type}</span>
                <span className="legend-sales">
                  {item.value.toLocaleString()} sales
                  <span className="legend-percentage">
                    ({((item.value / typeTotal) * 100).toFixed(1)}%)
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesDonutChart;