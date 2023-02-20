import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = ({ confirmed, pending }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Pie chart showing orders",
      },
    },
  };
  const data = {
    labels: ["Confirmed", "Pending"],
    datasets: [
      {
        label: "# of Orders",
        data: [confirmed, pending],
        backgroundColor: ["#32a885", "#ffc107"],
        borderColor: "white",
        borderWidth: 3,
      },
    ],
  };
  return <Pie data={data} options={options} />;
};
export default PieChart;
