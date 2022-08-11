// styled components
import styled from "styled-components";

//component
import { Doughnut } from "react-chartjs-2";

export const RightNowSectionWrapper = styled.section`
  padding: 1rem 1.5rem;
  background: #fff;
  border-radius: 0.3125rem;
  box-shadow: 0px 9px 12px 1px rgb(1 1 1 / 13%);
  font-family: "Maersk Headline";
`;

export const RightNowSectionHeader = styled.h3`
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 0.0625rem solid #dbdbdb;
  font-family: Maersk Headline;
  font-size: 1.25em;
  font-weight: 300;
  line-height: 1.5em;
  letter-spacing: 0em;
  text-align: left;
`;

export const RightNowSectionBodyDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const RightNowChartBox = styled.div`
  margin-bottom: 0.5rem;
  position: relative;
`;

export const DonughtChart = styled(Doughnut)`
  max-width: 11.5rem;
  max-height: 11.5rem;
`;

export const RightNowChartTitle = styled.div`
  margin-top: 1rem;
  text-align: center;
`;
export const DoughnutCount = styled.div`
  position: absolute;
  line-height: 40px;
  font-size: 40px;
  font-family: Maersk Headline;
  font-size: 40px;
  letter-spacing: 0em;
  z-index: 1;
`;

export const DoughnutChartBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
