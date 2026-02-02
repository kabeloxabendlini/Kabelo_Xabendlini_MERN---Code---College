import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// ...rest of the code remains unchanged

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BOOKINGS_BUCKETS = {
  Cheap: { min: 0, max: 100 },
  Normal: { min: 100, max: 200 },
  Expensive: { min: 200, max: 10000000 },
};

const BookingsChart = ({ bookings }) => {
  const labels = [];
  const dataPoints = [];

  for (const bucket in BOOKINGS_BUCKETS) {
    const count = bookings.reduce((prev, current) => {
      if (
        current.event.price >= BOOKINGS_BUCKETS[bucket].min &&
        current.event.price < BOOKINGS_BUCKETS[bucket].max
      ) return prev + 1;
      return prev;
    }, 0);

    labels.push(bucket);
    dataPoints.push(count);
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Bookings",
        data: dataPoints,
        backgroundColor: "rgba(220,220,220,0.6)",
        borderColor: "rgba(220,220,220,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Bookings per Price Category" },
    },
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BookingsChart;
