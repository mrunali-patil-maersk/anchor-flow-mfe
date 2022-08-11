// styled components
import styled from "styled-components";

// components
import { Box, Icon, Typography } from "@anchor/react-components";

export const ChartLegendContentWrapper = styled(Box)`
  gap: 0.5rem;
`;

export const BulletPoint = styled(Box)`
  width: 4px;
  height: 0px;
  padding: 4px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
`;

export const ChartLabelNumber = styled(Typography)`
  margin-left: 0.5rem;
  padding: 0.07rem 0 0.08rem 0.3rem;
  color: #40ab35;
  background-color: #d4ebd2;
  border-radius: 4px 0 0 4px;
`;

export const ArrowUpIcon = styled(Icon)`
  color: #40ab35;
  background-color: #d4ebd2;
  border-radius: 0 4px 4px 0;
`;
