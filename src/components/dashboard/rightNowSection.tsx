// next
import NextLink from "next/link";

//chart.js
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

// interface
interface RightNowSectionPropsType {
  donughtChartConfig: any;
  totalTaskCount: any;
}

// styles
import {
  RightNowSectionBodyDiv,
  RightNowSectionHeader,
  RightNowSectionWrapper,
  RightNowChartBox,
  RightNowChartTitle,
  DonughtChart,
  DoughnutChartBox,
  DoughnutCount,
} from "@styles/components/dashboard/rightNowSection.styles";

/**
 * @name RightNowSection
 * @description Method for generating the JSX for the RightNowSection component
 * @returns JSX for RightNowSection component
 */
const RightNowSection = ({ donughtChartConfig, totalTaskCount }: RightNowSectionPropsType) => {
  return (
    <RightNowSectionWrapper>
      <RightNowSectionHeader>Right now</RightNowSectionHeader>
      <RightNowSectionBodyDiv>
        <RightNowChartBox>
          <DoughnutChartBox>
            <DonughtChart
              data={donughtChartConfig?.runningInstanceChartConfig}
              options={donughtChartConfig?.runningInstanceChartConfig?.options}
            />
            <DoughnutCount>
              <NextLink href="#">
                <a>{totalTaskCount?.totalRunningInstance}</a>
              </NextLink>
            </DoughnutCount>
          </DoughnutChartBox>
          <RightNowChartTitle>Running Process Instance</RightNowChartTitle>
        </RightNowChartBox>
        <RightNowChartBox>
          <DoughnutChartBox>
            <DonughtChart
              data={donughtChartConfig?.openIncidentsChartConfig}
              options={donughtChartConfig?.openIncidentsChartConfig?.options}
            />
            <DoughnutCount>
              <NextLink href="#">
                <a>{totalTaskCount?.totalOpenIncidents}</a>
              </NextLink>
            </DoughnutCount>
          </DoughnutChartBox>
          <RightNowChartTitle>Open Incidents </RightNowChartTitle>
        </RightNowChartBox>
        <RightNowChartBox>
          <DoughnutChartBox>
            <DonughtChart
              data={donughtChartConfig?.openHumanTaskConfig}
              options={donughtChartConfig?.openHumanTaskConfig?.options}
            />
            <DoughnutCount>
              <NextLink href="#">
                <a>{totalTaskCount.totalOpenHumanTask}</a>
              </NextLink>
            </DoughnutCount>
          </DoughnutChartBox>
          <RightNowChartTitle>Open Human Task</RightNowChartTitle>
        </RightNowChartBox>
      </RightNowSectionBodyDiv>
    </RightNowSectionWrapper>
  );
};

export default RightNowSection;
