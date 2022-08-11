import styled from "styled-components";
export const StyledATag = styled.a`
  color: ${({ theme }) => theme.colors.primary.blue[600]};
  &:hover {
    cursor: pointer;
  }
`;
