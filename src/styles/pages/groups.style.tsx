// styled components
import styled from "styled-components";

// anchor ui components
import { Box } from "@anchor/react-components";

export const GroupsRoute = styled.section`
  padding: 24px;
  padding-top: 0;
  flex: 1;
  width: 100%;
`;

export const GroupMemberContainer = styled.section`
  padding: 0 24px;
  flex: 1;
  width: 100%;
`;

export const MemberDataWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.boxShadows.card[6]};
  background-color: ${({ theme }) => theme.colors.functional.grey[50]};
  border: 1px solid ${({ theme }) => theme.colors.functional.grey[200]};
  box-sizing: border-box;
  border-radius: 5px;
`;
export const TableBox = styled(Box)`
  & .table-wrapper {
    max-height: calc(100vh - 368px);
    & .table {
      div:last-child {
        border-bottom: unset;
      }
    }
  }
`;
