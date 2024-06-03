// CustomLineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

function CustomLineChart({ timeManagementChartData, timeManagementChartOptions, handleLineChartClick, panelName}) {
  const handleChartClick = (elements) => {
    if (elements.length > 0 && timeManagementChartData && timeManagementChartOptions) {
      const clickedElement = elements[0];
      const label = timeManagementChartData.labels[clickedElement.index];
      let chartName;
      
      // check which dataset was clicked
      if (clickedElement.datasetIndex === 0) {
        chartName = timeManagementChartData.datasets[0].label;
      } else if (clickedElement.datasetIndex === 1) {
        chartName = timeManagementChartData.datasets[1].label;
      }
      
      // Modify this line to access the correct property
      handleLineChartClick(label, chartName, panelName);
      
    }
  };
  
  

  return (
    <Line
            data={timeManagementChartData}
            options={timeManagementChartOptions}
            width={400}
            height={200}
            getElementsAtEvent={(elements) => handleChartClick(elements)}
          />
  );
}

export default CustomLineChart;
