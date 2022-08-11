// styled components
import styled from "styled-components";
import { Typography } from "@anchor/react-components";

export const ProcessDefinitionsRoute = styled.section`
  padding: 24px;
  padding-top: 0;
  background: ${({ theme }) => theme.colors.functional.grey["100"]};
  flex: 1;
  width: 100%;
`;

export const ProcessDefinitionHeader = styled.div`
  color: ${({ theme }) => theme.colors.primary.blue["900"]};
  justify-content: space-between;
  align-items: center;
  display: flex;
`;

export const ProcessDefinitionSubPage = styled.section`
  padding: 24px;
  padding-top: 16px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.functional.grey["50"]};
  border: 1px solid ${({ theme }) => theme.colors.functional.grey["200"]};
  box-shadow: 0px 9px 12px 1px #00000008;
  margin-top: 16px;
  overflow: auto;
`;

export const ProcessDefinitionSubPageSearchTextContainer = styled.section`
  margin-top: 1rem;
  display: flex;
  & input {
    height: 42px;
  }
`;

export const ProcessDefinitionSubHeaderContainer = styled.article`
  display: flex;
  justify-content: space-between;
  & nav {
    width: 100%;
  }
`;

export const ProcessDefinitionPreviewWidgetWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 12px;
  grid-row-gap: 12px;
  margin: 24px 0;
`;

export const ProcessDefinitionPreviewWidgetPager = styled.div`
  float: right;
`;
