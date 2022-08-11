// next
import dynamic from "next/dynamic";

// react
import { useEffect, useState } from "react";

// anchor ui components
import { Box } from "@anchor/react-components";

// APIs
import { callApi } from "@/configs/apis/axiosAPI";
import { processDefinitionStatisticsUrl, taskUrl, apiGateway } from "@/configs/apis/apiEndPoints";
import {
  processListCountUrl,
  DecisionDefinitionCountUrl,
  deploymentCountUrl,
} from "@/configs/apis/apiEndPoints";

// dynamic static components
const RightNowSection = dynamic(() => import("@/components/dashboard/rightNowSection"), {
  ssr: false,
});

const Metrics = dynamic(() => import("@/components/dashboard/metrics"), {
  ssr: false,
});

const DeployedSection = dynamic(() => import("@/components/dashboard/deployedSection"), {
  ssr: false,
});

// constants
import { assignedTasks, unassignedTasks } from "@/configs/dashboard.constants";

// interfaces
interface DonughtChartConfigBuilderType {
  [key: string]: {
    name: string;
    count: number;
  };
}

interface ConfigType {
  datasets: [
    {
      labels: Array<string>;
      data: Array<number>;
      backgroundColor: Array<string>;
      hoverOffset: number;
      borderWidth: number;
      cutout: number;
    }
  ];
  options: {};
}

// styles
import { DashboardBody, DashboardWrapper, DashboradHeaderH1 } from "@styles/pages/dashboard.style";
import LoadingSpinner from "@/components/tasklist/loadingSpinner";
import axios from "axios";

/**
 * @name Dashboard
 * @description Method for generating the JSX for the Dashboard page
 * @returns JSX for Dashboard page
 */
const Dashboard = () => {
  const [totalTaskCount, setTotalTaskCount] = useState({});
  const [donughtChartConfig, setDonughtChartConfig] = useState({});
  const doughnutChartColors = [
    "#003D6D",
    "#005487",
    "#0073AB",
    "#058EC6",
    "#0CA0CE",
    "#42B0D5",
    "#77C6E0",
    "#91D8F2",
    "#B5E0F5",
  ];

  /**
   * @name donughtChartConfigBuilder
   * @description Method for generating the config for donught chart
   * @returns config for donught chart
   */
  const donughtChartConfigBuilder = (payload: DonughtChartConfigBuilderType) => {
    const config: ConfigType = {
      datasets: [
        {
          labels: [],
          data: [],
          backgroundColor: [],
          hoverOffset: 4,
          borderWidth: 0,
          cutout: 66,
        },
      ],
      options: {
        layout: {
          padding: 4,
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                return `${context.dataset.labels[context.dataIndex]}: ${context.parsed}`;
              },
            },
            backgroundColor: "black",
            opacity: 0,
          },
        },
      },
    };

    for (const key in payload) {
      config.datasets[0].data.push(payload[key].count);
      config.datasets[0].labels.push(payload[key].name);
    }
    config.datasets[0].backgroundColor = doughnutChartColors.slice(0, Object.keys(payload).length);
    return config;
  };

  const getProcessDefinitionStatistics = async () => {
    try {
      const result = await callApi(
        `${apiGateway}${processDefinitionStatisticsUrl}?rootIncidents=true`
      );
      processProcessDefinitionStatsResponse(result);
    } catch (error) {
      // @TODO - Integrate it with the toast component once available.
      alert("Failed to get Running Process.");
      console.error(error);
    }
  };

  const processProcessDefinitionStatsResponse = (data) => {
    const runningInstance = {};
    const openIncidents = {};
    let runningInstancesCount = 0;
    let openIncidentsCount = 0;

    data?.forEach((e: any) => {
      if (e.instances > 0) {
        if (runningInstance[e.definition.key]) {
          runningInstance[e.definition.key].count += e.instances;
        } else {
          Object.assign(runningInstance, {
            [e.definition.key]: { name: e.definition.key, count: e.instances },
          });
        }
        runningInstancesCount += e.instances;
      }
      if (e.incidents.length > 0) {
        e.incidents.forEach((incident) => {
          if (openIncidents[e.definition.key]) {
            openIncidents[e.definition.key].count += incident.incidentCount;
          } else {
            Object.assign(openIncidents, {
              [e.definition.key]: {
                name: e.definition.key,
                count: incident.incidentCount,
              },
            });
          }
          openIncidentsCount += incident.incidentCount;
        });
      }
    });

    setProcessedProcessDefinitionStatsDataToState(
      runningInstance,
      openIncidents,
      runningInstancesCount,
      openIncidentsCount
    );
  };

  const setProcessedProcessDefinitionStatsDataToState = (
    runningInstance: DonughtChartConfigBuilderType,
    openIncidents: DonughtChartConfigBuilderType,
    runningInstancesCount: number,
    openIncidentsCount: number
  ) => {
    setTotalTaskCount((prevState) => {
      return {
        ...prevState,
        totalRunningInstance:
          runningInstancesCount < 10 ? "0" + runningInstancesCount : runningInstancesCount,
        totalOpenIncidents: openIncidentsCount < 10 ? "0" + openIncidentsCount : openIncidentsCount,
      };
    });

    setDonughtChartConfig((prevState) => {
      return {
        ...prevState,
        runningInstanceChartConfig: donughtChartConfigBuilder(runningInstance),
        openIncidentsChartConfig: donughtChartConfigBuilder(openIncidents),
      };
    });
  };

  const getOpenHumanTask = async () => {
    try {
      const taskResponse = await callApi(`${apiGateway}${taskUrl}`);
      processTaskAPIResponse(taskResponse);
    } catch (error) {
      // @TODO - Integrate it with the toast component once available.
      alert("Failed to get open human task.");
      console.error(error);
    }
  };

  const processTaskAPIResponse = (data) => {
    const tasks = {
      assignedTasks: { name: assignedTasks, count: 0 },
      unassignedTasks: { name: unassignedTasks, count: 0 },
    };
    let totalTasks = 0;

    data?.forEach((e: any) => {
      if (e.assignee) {
        tasks.assignedTasks.count += 1;
      } else {
        tasks.unassignedTasks.count += 1;
      }
      totalTasks += 1;
    });

    setProcessedResponseToState(tasks, totalTasks);
  };

  const setProcessedResponseToState = (
    tasks: DonughtChartConfigBuilderType,
    totalTasks: number
  ) => {
    setTotalTaskCount((prevState) => {
      return {
        ...prevState,
        totalOpenHumanTask: totalTasks < 10 ? "0" + totalTasks : totalTasks,
      };
    });

    setDonughtChartConfig((prevState) => {
      return {
        ...prevState,
        openHumanTaskConfig: donughtChartConfigBuilder(tasks),
      };
    });
  };

  // deployed seciton
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [processCount, setProcessCount] = useState<Number>(0);
  const [decisionCount, setDecisionCount] = useState<Number>(0);
  const [deploymentCount, setDeploymentCount] = useState<Number>(0);

  const getProcessCount = async () => {
    try {
      setIsLoading(true);
      const { count } = await callApi(`${apiGateway}${processListCountUrl}`);
      setProcessCount(count < 10 ? "0" + count : count);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDecisionDefinitionCount = async () => {
    try {
      setIsLoading(true);
      const { count } = await callApi(`${apiGateway}${DecisionDefinitionCountUrl}`);
      setDecisionCount(count < 10 ? "0" + count : count);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDeploymentsCount = async () => {
    try {
      setIsLoading(true);
      const { count } = await callApi(`${apiGateway}${deploymentCountUrl}`);
      setDeploymentCount(count < 10 ? "0" + count : count);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProcessDefinitionStatistics();
    getOpenHumanTask();
    getProcessCount();
    getDecisionDefinitionCount();
    getDeploymentsCount();
  }, []);

  if (Object.keys(donughtChartConfig).length !== 3) {
    return (
      <Box height="80vh">
        <LoadingSpinner />
      </Box>
    );
  }

  return (
    <DashboardWrapper>
      <DashboradHeaderH1>Dashboard</DashboradHeaderH1>
      <DashboardBody>
        <RightNowSection donughtChartConfig={donughtChartConfig} totalTaskCount={totalTaskCount} />
        <DeployedSection
          isLoading={isLoading}
          processCount={processCount}
          decisionCount={decisionCount}
          deploymentCount={deploymentCount}
        />
      </DashboardBody>
      <Metrics />
    </DashboardWrapper>
  );
};

// Protected routes
Dashboard.requireAuth = true;
export default Dashboard;
