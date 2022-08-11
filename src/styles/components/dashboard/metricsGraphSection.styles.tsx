// styled components
import styled from "styled-components";

// component
import { Line } from "react-chartjs-2";

export const MetricsGraphSectionWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(33%, 1fr));
  gap: 1rem;
  margin: 1rem 1rem 1rem 0;
`;

export const ChartDiv = styled.div`
  max-width: 100%;
`;

export const ChartTitle = styled.h5`
  margin-bottom: 1rem;
  color: #353535;
  font-family: Maersk Text;
  line-height: 20px;
  letter-spacing: 0em;
`;

export const ChartLegend = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.5rem;
  color: #353535;
`;

export const LineChart = styled(Line)`
  max-height: 295px;
`;
