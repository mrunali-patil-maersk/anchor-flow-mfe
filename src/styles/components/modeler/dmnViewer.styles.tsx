// styled components
import styled from "styled-components";

// styles
export const DmnModelerSection = styled.section`
  display: flex;
  flex-direction: column;
`;

export const DmnModelerSectionContainer = styled.section`
  display: flex;
`;

export const DmnModelerSectionContainerCanvas = styled.section`
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.functional.grey["300"]};
  background-color: ${({ theme }) => theme.colors.functional.grey["50"]};
  width: 100%;
  max-width: ${(props) => (props.sidebarIsExpanded ? "calc(100vw - 270px)" : "calc(100vw - 64px)")};
`;
