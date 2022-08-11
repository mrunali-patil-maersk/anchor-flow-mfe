// react
import { useState } from "react";

// constants
import {
  metricsTabItemsConfig,
  thisMonth,
  thisMonthLineChartData,
  thisWeek,
  thisWeekLineChartData,
  today,
  todayLineChartData,
} from "src/configs/dashboard.constants";

//interfaces
interface MetricsGraphSectionProps {
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
}
interface MetricsTabItemType {
  id: string;
  label: string;
  active: boolean;
}

// styles
import { Hr, MetricsDiv } from "@styles/components/dashboard/metrics.styles";
import MetricsHeaderSection from "@/components/dashboard/metricsHeaderSection";
import MetricsGraphSection from "./metricsGraphSection";

/**
 * @name Metrics
 * @description Method for generating the JSX for the Metrics component
 * @returns JSX for Metrics component
 */
const Metrics = () => {
  const chartDataInitialState = {
    chart1: {
      labels: [2, 5, 8, 11, 15, 19, 23, 27, 31, 35, 39],
      dataSet1Label: "Started 1.9M",
      dataSet1: [15, 13, 4, 3, 9, 2, 10, 14, 1, 5],
      dataSet2Label: "Ended 1.9M",
      dataSet2: [11, 10, 9, 8, 7, 6, 5, 4, 3, 2],
    },
    chart2: {
      labels: [2, 5, 8, 11, 15, 19, 23, 27, 31, 35, 39],
      dataSet1Label: "Started 1.9M",
      dataSet1: [15, 13, 4, 3, 9, 2, 10, 14, 1, 5],
    },
    chart3: {
      labels: [2, 5, 8, 11, 15, 19, 23, 27, 31, 35, 39],
      dataSet1Label: "Started 1.9M",
      dataSet1: [15, 13, 4, 3, 9, 2, 10, 14, 1, 5],
    },
  };

  const [chartData, setChartData] = useState<MetricsGraphSectionProps>(chartDataInitialState);
  const [activeTabConfig, setActiveTabConfig] =
    useState<MetricsTabItemType[]>(metricsTabItemsConfig);

  /**
   * @name fetchLineChartData
   * @description Method for fetching the chart data and updating the state
   * @param value
   */
  const fetchLineChartData = (value: string) => {
    switch (value) {
      case today:
        setChartData(todayLineChartData);
        break;
      case thisWeek:
        setChartData(thisWeekLineChartData);
        break;
      case thisMonth:
        setChartData(thisMonthLineChartData);
        break;
      default:
        setChartData(todayLineChartData);
    }
  };

  /**
   * @name setActiveTab
   * @description Method for updating the state on tab clicks
   * @param item
   */
  const setActiveTab = (item: MetricsTabItemType) => {
    let tabConfig = JSON.parse(JSON.stringify(activeTabConfig));
    tabConfig.forEach((e) => {
      if (e.id === item.id) {
        e.active = true;
      } else {
        e.active = false;
      }
    });
    setActiveTabConfig(tabConfig);
  };

  /**
   * @name tabClickHandler
   * @description Method for handling the tab clicks
   * @param item
   */
  const tabClickHandler = (item: MetricsTabItemType) => {
    switch (item.id) {
      case today:
        setActiveTabConfig(metricsTabItemsConfig);
        fetchLineChartData(today);
        break;
      case thisWeek:
        setActiveTab(item);
        fetchLineChartData(thisWeek);
        break;
      case thisMonth:
        setActiveTab(item);
        fetchLineChartData(thisMonth);
        break;
      default:
        setActiveTabConfig(metricsTabItemsConfig);
    }
  };

  return (
    <MetricsDiv>
      <MetricsHeaderSection activeTabConfig={activeTabConfig} tabClickHandler={tabClickHandler} />
      <Hr />
      <MetricsGraphSection chartData={chartData} />
    </MetricsDiv>
  );
};

export default Metrics;
