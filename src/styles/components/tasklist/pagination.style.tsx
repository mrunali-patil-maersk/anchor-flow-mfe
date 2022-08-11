import styled, { css } from "styled-components";

const paginationDefault = css`
  color: ${({ theme }) => theme.colors.functional.grey[0]};
  background-color: ${({ theme }) => theme.colors.functional.grey[50]};
  border-color: ${({ theme }) => theme.colors.functional.grey[400]};
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.blue[200]};
    color: ${({ theme }) => theme.colors.functional.grey[50]};
  }
`;

const paginationDots = css`
  color: ${({ theme }) => theme.colors.functional.grey[0]};
  background-color: ${({ theme }) => theme.colors.functional.grey[50]};
  border-color: ${({ theme }) => theme.colors.functional.grey[400]};
  cursor: default;
`;

const paginationActive = css`
  position: relative;
  color: ${({ theme }) => theme.colors.functional.grey[50]};
  background-color: ${({ theme }) => theme.colors.primary.blue[300]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  border-color: transparent;
  &:after {
    background-color: ${({ theme }) => theme.colors.primary.blue[600]};
    content: "";
    height: 4px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-bottom-left-radius: ${({ theme }) => theme.borderRadius.medium};
    border-bottom-right-radius: ${({ theme }) => theme.borderRadius.medium};
  }
`;

const paginationDisabled = css`
  background-color: ${({ theme }) => theme.colors.functional.grey[300]};
  cursor: not-allowed;
  color: ${({ theme }) => theme.colors.functional.grey[900]};
  border-color: transparent;
`;

export const PaginationContainer = styled.ul`
  display: flex;
  justify-content: center;
  list-style-type: none;
  width: 100%;
  margin: 0 auto;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 8px;
`;

export const PaginationItem = styled.li`
  text-align: center;
  display: flex;
  font-size: ${({ theme }) => theme.fontSizes[12]};
  padding: ${({ theme }) => theme.space[0]};
  flex: 1;
  height: ${({ buttonSize }) => (buttonSize === "large" ? "40px" : "28px")};
  width: ${({ buttonSize }) => (buttonSize === "large" ? "40px" : "28px")};
  max-height: ${({ buttonSize }) => (buttonSize === "large" ? "40px" : "28px")};
  max-width: ${({ buttonSize }) => (buttonSize === "large" ? "40px" : "28px")};
  margin: 0 2px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  line-height: 0;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border-width: 1px;
  font-family: ${({ theme }) => theme.fonts.body};
  border-style: solid;
  cursor: pointer;
  ${(props) =>
    props.variant === "active"
      ? paginationActive
      : props.variant === "disabled"
      ? paginationDisabled
      : props.variant === "dots"
      ? paginationDots
      : paginationDefault}
`;
