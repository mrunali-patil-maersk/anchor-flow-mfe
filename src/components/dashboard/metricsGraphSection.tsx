// chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// components
import ChartLegendContent from "./chartLegendContent";

// interface
interface MetricsGraphSectionProps {
  chartData: {
    chart1: {
      labels: Array<number>;
      dataSet1Label: string;
      dataSet1: Array<number>;
      dataSet2Label: string;
      dataSet2: Array<number>;
    };
    chart2: {
      labels: Array<number>;
      dataSet1Label: string;
      dataSet1: Array<number>;
    };
    chart3: {
      labels: Array<number>;
      dataSet1Label: string;
      dataSet1: Array<number>;
    };
  };
}

// styles
import {
  ChartDiv,
  ChartLegend,
  ChartTitle,
  LineChart,
  MetricsGraphSectionWrapper,
} from "@styles/components/dashboard/metricsGraphSection.styles";

/**
 * @name lineChartOptionsConfigBuilder
 * @description Method for returning the configuration for option prop of Line component
 * @param title
 */
const lineChartOptionsConfigBuilder = (title: string) => {
  return {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
        align: "start",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 5,
          boxHeight: 5,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        // use below property for defining minimum and maximum y-axis value
        // suggestedMin: 50,
        // suggestedMax: 100,
      },
    },
  };
};

/**
 * @name dataSetsConfigBuilder
 * @description Method for returning the configuration for datasets of Line component
 * @param label
 * @param data
 * @param color
 */
const dataSetsConfigBuilder = (label: string, data: Array<number>, color: string) => {
  return {
    label,
    data,
    borderWidth: 1,
    borderColor: color,
    backgroundColor: color,
    pointBorderColor: color,
    pointBackgroundColor: color,
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: color,
    pointHoverBorderColor: color,
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
  };
};

/**
 * @name MetricsGraphSection
 * @description Method for generating the JSX for the MetricsGraphSection component
 * @returns JSX for MetricsGraphSection component
 */
const MetricsGraphSection = ({ chartData }: MetricsGraphSectionProps) => {
  // first chart configuration
  const chart1DataConfig = {
    labels: chartData.chart1.labels,
    datasets: [
      dataSetsConfigBuilder(chartData.chart1.dataSet1Label, chartData.chart1.dataSet1, "#005487"),
      dataSetsConfigBuilder(chartData.chart1.dataSet2Label, chartData.chart1.dataSet2, "#42B0D5"),
    ],
  };

  // second chart configuration
  const chart2DataConfig = {
    labels: chartData.chart2.labels,
    datasets: [
      dataSetsConfigBuilder(chartData.chart2.dataSet1Label, chartData.chart2.dataSet1, "#42B0D5"),
    ],
  };

  // third chart configuration
  const chart3DataConfig = {
    labels: chartData.chart3.labels,
    datasets: [
      dataSetsConfigBuilder(chartData.chart1.dataSet2Label, chartData.chart1.dataSet2, "#005487"),
      dataSetsConfigBuilder(chartData.chart3.dataSet1Label, chartData.chart3.dataSet1, "#42B0D5"),
    ],
  };

  return (
    <MetricsGraphSectionWrapper>
      <ChartDiv>
        <ChartTitle>Evaluated decision instances</ChartTitle>
        <ChartLegend>
          <ChartLegendContent label="Started" color="primary.blue.700" count="1.9M" />
          <ChartLegendContent label="Ended" color="primary.blue.300" count="1.9M" />
        </ChartLegend>
        <LineChart
          options={lineChartOptionsConfigBuilder("Evaluated decision instances")}
          data={chart1DataConfig}
        />
      </ChartDiv>
      <ChartDiv>
        <ChartTitle>Executed activity instances</ChartTitle>
        <ChartLegend>
          <ChartLegendContent label="Started" color="primary.blue.300" count="1.9M" />
        </ChartLegend>
        <LineChart
          options={lineChartOptionsConfigBuilder("Executed activity instances")}
          data={chart2DataConfig}
        />
      </ChartDiv>
      <ChartDiv>
        <ChartTitle>Executed Jobs</ChartTitle>
        <ChartLegend>
          <ChartLegendContent label="Successful" color="primary.blue.700" count="1.9M" />
          <ChartLegendContent label="Failed" color="primary.blue.300" count="1.9M" />
        </ChartLegend>
        <LineChart
          options={lineChartOptionsConfigBuilder("Executed activity instances")}
          data={chart3DataConfig}
        />
      </ChartDiv>
    </MetricsGraphSectionWrapper>
  );
};

export default MetricsGraphSection;
