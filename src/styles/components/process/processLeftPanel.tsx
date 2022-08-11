// styled components
import styled from "styled-components";

export const LeftPanelWrapper = styled.aside`
  width: inherit;
  height: inherit;
  overflow: hidden;
  word-break: break-all;
  padding: 1.5rem 1.5rem;
  display: ${({ isActive }) => (isActive ? `block` : `none`)};
  ${({ border_direction, theme }) =>
    border_direction
      ? `border-${border_direction}: 1px solid ${theme.colors.functional.grey[300]}`
      : `border:none`};
`;
