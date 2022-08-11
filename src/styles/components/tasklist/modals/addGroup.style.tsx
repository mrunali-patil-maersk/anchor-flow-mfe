// styled components
import styled from "styled-components";

// components
import { Box, Modal } from "@anchor/react-components";

export const TaskListAddGroupModal = styled(Modal)`
  &&& {
    width: 560px;
    max-height: 424px;
  }
`;

export const GroupListItem = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.space[8]} 0;
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.functional.grey["400"]};
  }
`;

export const SelectAddGroupContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: self-start;
  margin-bottom: ${({ theme }) => theme.space[16]};
  color: ${({ theme }) => theme.colors.functional.grey[800]};
  select {
    color: ${({ theme }) => theme.colors.functional.grey[800]};
  }
`;

export const SelectedGroupListContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 250px;
`;
