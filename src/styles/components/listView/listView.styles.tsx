// styled components
import styled from "styled-components";
import { Typography } from "@anchor/react-components";

export const ListViewRoute = styled.section`
  padding: 24px;
  padding-top: 0;
  background: #f8f8f8;
  flex: 1;
  width: 100%;
`;

export const ListViewPage = styled.section`
  background: #f8f8f8;
`;

export const ListViewHeaderSpan = styled(Typography)`
  font-weight: 300;
  color: ${({ theme }) => theme.colors.primary.blue["900"]};
`;

export const ListViewSubPage = styled.section`
  padding: ${(props) => (props.heading ? "16px 24px 24px" : "none")};
  border-radius: 5px;
  background: #ffffff;
  border: ${(props) => (props.heading ? "1px solid #ededed" : "none")};
  box-shadow: 0px 9px 12px 1px #00000008;
  margin-top: 16px;
`;

export const ListViewSearch = styled.section`
  margin-top: 0px;
`;

export const ListTableWrapper = styled.section`
  margin-top: 16px;
  & .table-wrapper {
    max-height: ${(props) => ((props.scrollHeight || "").length ? props.scrollHeight : "unset")};
    & .table {
      div:last-child {
        border-bottom: unset;
      }
    }
  }
`;
