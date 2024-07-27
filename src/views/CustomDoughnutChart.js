// CustomDoughnutChart.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

function CustomDoughnutChart({ signInChartData, signInChartOptions, handleDoughnutChartClick, panelName}) {
  const handleChartClick = (elements) => {
    if (elements.length > 0 && signInChartData && signInChartOptions) {
      const clickedElement = elements[0];
      const label = signInChartData.labels[clickedElement.index];
      const chartName = signInChartData.datasets[0].label; // Modify this line to access the correct property
      handleDoughnutChartClick(label, chartName, panelName);
    }
  };
  

  return (
    <Doughnut
          data={signInChartData}
          options={signInChartOptions}
          className="ct-chart ct-perfect-fourth"
          height={300}
          width={456}
          getElementsAtEvent={(elements) => handleChartClick(elements)}
        />
  );
}

export default CustomDoughnutChart;
