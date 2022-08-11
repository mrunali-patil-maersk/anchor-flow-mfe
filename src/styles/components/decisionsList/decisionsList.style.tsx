// styled components
import { Typography, Box } from "@anchor/react-components";
import styled from "styled-components";

export const StyledHeaderTxt = styled.div`
  color: ${({ theme }) => theme.colors.primary.blue["900"]};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DecisionsListWrapper = styled(Box)`
  padding: 24px;
  padding-top: 16px;
  padding-top: 0;
`;

export const DecisionsListContainer = styled.div`
  display: flex;
  margin-top: 16px;
  padding: 24px;
  padding-top: 16px;
  flex-direction: column;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.functional.grey["50"]};
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.functional.grey["200"]};
  box-sizing: border-box;
  box-shadow: 0px 5px 6px -3px rgba(0, 0, 0, 0.04), 0px 3px 16px 2px rgba(0, 0, 0, 0.03),
    0px 9px 12px 1px rgba(0, 0, 0, 0.03);
  border-radius: 5px;
  > section {
    background: ${({ theme }) => theme.colors.functional.grey["50"]};
  }
`;

export const MainHeading = styled(Typography)`
  color: ${({ theme }) => theme.colors.primary.blue["900"]};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 450px;
  font-weight: 300;
  line-height: 46px;
`;
