// CustomPieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';

function CustomPieChart({ chartData, optionsPieChart, handlePieChartClick, responseType}) {
  const handleChartClick = (elements) => {
    if (elements.length > 0 && chartData && chartData.datasets && chartData.datasets[0]) {
      const clickedElement = elements[0];
      const label = chartData.labels[clickedElement.index];
      const chartName = chartData.datasets[0].label; // Modify this line to access the correct property
      console.log("here", chartData.datasets);
      handlePieChartClick(label, chartName, responseType);
    }
  };
  

  return (
    <Pie
      data={chartData}
      options={optionsPieChart}
      width={456}
      height={300}
      getElementsAtEvent={(elements) => handleChartClick(elements)}
    />
  );
}

export default CustomPieChart;
