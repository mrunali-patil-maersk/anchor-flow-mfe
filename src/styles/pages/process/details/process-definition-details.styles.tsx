// styled components
import styled from "styled-components";

export const ProcessDefinitionHeaderContainer = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProcessDefinitionHeaderButtonContainer = styled.section`
  display: flex;
  column-gap: 16px;
`;

export const ProcessDefinitionSubPageContainer = styled.section`
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.functional.grey[50]};
  border: 1px solid ${({ theme }) => theme.colors.functional.grey[200]};
  box-shadow: 0px 9px 12px 1px #00000008;
  margin-top: 16px;
  overflow: auto;
  display: grid;
  &.grid-col-2 {
    grid-template-columns: 220px calc(100% - 220px);
  }
  &.grid-col-full {
    grid-template-columns: auto;
  }
`;

export const ProcessDefinitionSubPageContainerRight = styled.section`
  padding: 24px;
  padding-top: 12px;
`;

export const ProcessDefinitionSubPageContainerRightHeader = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 16px;
`;
