import styled from "styled-components";
import { Box } from "@anchor/react-components";

export const FormContainer = styled.div`
  display: grid;
  height: 100%;
  grid-template-areas:
    "formheader"
    "formmain";
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
  overflow: hidden;
`;

export const FormHeader = styled.div`
  grid-area: formheader;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const FormRoute = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 24px;
  padding-top: 0;
  height: calc(100vh - 124px);
`;

export const FormsListPage = styled.section`
  padding: 0 24px;
  flex: 1;
  width: 100%;
`;

export const FormsListWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.boxShadows.card[6]};
  background-color: ${({ theme }) => theme.colors.functional.grey[50]};
  border: 1px solid ${({ theme }) => theme.colors.functional.grey[200]};
  box-sizing: border-box;
  border-radius: 5px;
  padding: 24px;
  padding-bottom: 16px;
  margin-top: 16px;
`;

export const TableWrapper = styled(Box)`
  & .table-wrapper {
    max-height: calc(100vh - 368px);
    & .table {
      div:last-child {
        border-bottom: unset;
      }
      .table-cell.id {
        span {
          flex: 1;
          #copy-btn {
            display: none;
          }
          &:hover {
            #copy-btn {
              display: flex;
            }
          }
        }
      }
    }
  }
`;

export const PaginationWrapper = styled(Box)`
  float: right;
  margin-right: -12px;
  margin-top: 4px;
`;
