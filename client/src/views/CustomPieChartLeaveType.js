// CustomPieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';

function CustomPieChartLeaveType({ chartData, optionsPieChart, handlePieChartClick }) {
  const handleChartClick = (elements) => {
    if (elements.length > 0 && chartData && chartData.datasets && chartData.datasets[0]) {
      const clickedElement = elements[0];
      const label = chartData.labels[clickedElement.index];
      const chartName = chartData.datasets[0].label; // Modify this line to access the correct property
      handlePieChartClick(label, chartName);
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

export default CustomPieChartLeaveType;
