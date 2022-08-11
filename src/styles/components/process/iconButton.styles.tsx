// styled components
import styled from "styled-components";

import { Button } from "@anchor/react-components";

export const IconButtonContainer = styled.section`
  display: flex;
  align-items: flex-start;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.functional.grey["400"]}`};
`;

export const IconButton = styled(Button)`
  background: ${({ active, theme }) =>
    active ? theme.colors.functional.grey["400"] : theme.colors.functional.grey["50"]};
  > i {
    margin: 0;
    padding: 0;
  }
  margin-right: 8px;
  padding: 8px 6px;
`;
