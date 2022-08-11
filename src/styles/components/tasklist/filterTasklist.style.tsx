import styled from "styled-components";
import { Box } from "@anchor/react-components";

export const FilterSection = styled.section`
  display: flex;
`;

export const FiltersWrapper = styled.section`
  display: flex;
  margin: 12px 0px 12px 24px;
  button {
    :hover {
      background-color: unset;
    }
  }
  p {
    font-weight: 300;
  }
`;

export const FilterButtonWrapper = styled.div`
  position: relative;
  display: flex;
  & button {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const FilterCards = styled.div`
  position: absolute;
  left: 0px;
  top: 36px;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.functional.grey[50]};
  border: 1px solid ${({ theme }) => theme.colors.functional.grey[400]};
  box-sizing: border-box;
  border-radius: 4px;
  width: 166px;
  padding-top: 8px;
  padding-bottom: 8px;
`;

export const FilterItem = styled(Box)`
  display: flex;
  justify-content: flex-start;
  cursor: pointer;
  padding: 4px 8px;
  :hover {
    background-color: ${({ theme }) => `${theme.colors.primary.blue[50]}50`};
  }
  i {
    padding-top: 2px;
  }
  span {
    padding-left: 8px;
  }
`;
