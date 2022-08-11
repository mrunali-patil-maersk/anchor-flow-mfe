// styled components
import styled from "styled-components";

// components
import { Typography } from "@anchor/react-components";

export const ModelerRoute = styled.section`
  padding: 24px;
  padding-top: 0;
  background: #f8f8f8;
  max-width: ${({ sidebarIsExpanded }) =>
    sidebarIsExpanded ? "calc(100vw - 270px)" : "calc(100vw - 64px)"};
  width: 100%;
`;

export const ModelerRouteHeader = styled(Typography)`
  color: ${({ theme }) => theme.colors.primary.blue["900"]};
  font-weight: 100;
  margin-bottom: 32px;
`;
