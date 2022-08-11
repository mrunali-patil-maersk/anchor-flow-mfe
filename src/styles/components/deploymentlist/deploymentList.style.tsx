// styled components
import { Typography, Box } from "@anchor/react-components";
import styled from "styled-components";

export const StyledHeaderTxt = styled(Typography)`
  margin-bottom: 16px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.primary.blue["900"]};
`;

export const DeploymentsListWrapper = styled(Box)`
  padding: 24px;
  padding-top: 0;
`;

export const DeploymentsListContainer = styled.div`
  display: flex;
  padding: 24px;
  flex-direction: column;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.functional.grey["50"]};
  border: 1px solid ${({ theme }) => theme.colors.functional.grey["200"]};
  box-sizing: border-box;
  box-shadow: 0px 5px 6px -3px rgba(0, 0, 0, 0.04), 0px 3px 16px 2px rgba(0, 0, 0, 0.03),
    0px 9px 12px 1px rgba(0, 0, 0, 0.03);
  border-radius: 5px;
`;

export const DeploymentsListHeadContainer = styled(Box)`
  font-family: "Maersk Headline";
  font-size: 20px;
  line-height: 24px;
  display: flex;
  color: ${({ theme }) => theme.colors.functional.grey["800"]};
`;

export const DeploymentsListTableWrapper = styled.div`
  margin-top: 0px;
`;

export const DeploymentPager = styled.div`
  float: right;
`;
