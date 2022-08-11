// styled components
import styled from "styled-components";

export const Deployments = styled.section`
  background: ${({ theme }) => theme.colors.functional.grey["100"]};
  width: ${(props) => (props.sidebarIsExpanded ? "calc(100vw - 270px)" : "calc(100vw - 64px)")};
`;
