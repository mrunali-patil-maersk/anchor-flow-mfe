// styled components
import styled from "styled-components";

export const DecisionDefinitionHeaderContainer = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DecisionDefinitionHeaderButtonContainer = styled.section`
  display: flex;
  column-gap: 16px;
`;

export const DecisionDefinitionSubPageContainer = styled.section`
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

export const DecisionDefinitionSubPageContainerLeft = styled.section`
  border-right: 1px solid ${({ theme }) => theme.colors.functional.grey[300]};
  padding: 24px;
`;

export const DecisionDefinitionSubPageContainerRight = styled.section`
  padding: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const DecisionDefinitionSubPageContainerRightHeader = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const DecisionDefinitionSubPageRightContents = styled.section`
  overflow: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const DecisionDefinitionSubPageSearchTextContainer = styled.section`
  margin-top: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1;
  gap: 1.5rem;
  & input {
    height: 42px;
  }
`;
