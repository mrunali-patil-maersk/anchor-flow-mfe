// styled components
import styled from "styled-components";

// components
import { Typography, Box } from "@anchor/react-components";

export const StyledTypography = styled(Typography)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const TaskItemContainer = styled(Box)`
  cursor: pointer;
  background-color: ${({ selected, theme }) =>
    selected ? `${theme.colors.primary.blue[50]}50` : theme.colors.functional.grey[50]};

  border-bottom: 1px solid ${({ theme }) => theme.colors.functional.grey[300]};
  &:hover {
    background-color: ${({ theme }) => `${theme.colors.primary.blue[50]}50`};
  }
`;

export const TaskIconWrapper = styled(Box)``;

export const TaskItemWrapper = styled(Box)`
  min-width: 0;
  width: 100%;
`;
export const TaskItemName = styled(StyledTypography)`
  color: ${({ theme }) => theme.colors.primary.blue["700"]};
`;
export const TaskProcessDefId = styled(StyledTypography)`
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.functional.grey["800"]};
`;
export const TaskFooter = styled(Box)`
  color: ${({ theme }) => theme.colors.functional.grey["600"]};
`;
export const TaskCreatedDate = styled(StyledTypography)``;
export const TaskPriority = styled(StyledTypography)``;

export const TaskPanelWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
`;
