import { Doughnut } from "react-chartjs-2";
import "../styles/charts.css";
import "../styles/Info.css";

/**
 * @param {*} param
 * @returns Doughnut chart with the label of rating
 */
const DonutChart = ({ rating }) => {
  let ratingVal = rating["Value"].substring(0, rating["Value"].indexOf("/"));
  if (!ratingVal) {
    ratingVal = rating["Value"].substring(0, rating["Value"].indexOf("%"));
  }
  // we assume the default max is 100 and for tmdb it is 10
  let maxScore = 100;
  if (rating["Source"] === "Internet Movie Database") {
    maxScore = 10;
  }
  // object of data
  const data = {
    labels: ["Rating", "Rating from max score"],
    datasets: [
      {
        label: "Score",
        backgroundColor: ["#0000FF", "#FFFFFF"],
        hoverBackgroundColor: ["#0000FF", "#FFFFFF"],
        data: [ratingVal, maxScore - ratingVal],
      },
    ],
    text: ratingVal,
  };
  return (
    <div className="chart-container">
      <label htmlFor="r-chart">
        {rating["Source"]} Rating: {ratingVal}
      </label>
      <Doughnut
        id="r-chart"
        aria-label="donut chart"
        role="img"
        data={data}
        options={{
          aspectRatio: 1,
          title: {
            display: true,
            text: rating["Source"],
            fontSize: 20,
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};

export default DonutChart;