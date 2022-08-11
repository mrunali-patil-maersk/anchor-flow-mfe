// styled components
import styled, { css } from "styled-components";

//components
import { Box } from "@anchor/react-components";

export const TaskDetailsContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 24px;
  height: 100%;
`;

export const TaskButtonWrapper = styled(Box)<{
  variant: "disabled" | "default";
}>`
  ${({ variant }) =>
    variant === "disabled" &&
    css`
      position: relative;
      &:after {
        content: " ";
        background-color: rgba(238, 238, 238, 0.33);
        position: absolute;
        top: -4px;
        left: -4px;
        bottom: -4px;
        right: -4px;
        cursor: not-allowed;
        padding: 4px;
      }
    `}
  > div {
    margin: 0px 12px 8px 0px;
  }
`;

export const CloseButtonStyled = styled(Box)`
  position: relative;
  > div {
    position: absolute;
    bottom: 7px;
    right: 4px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    color: ${({ theme }) => theme.colors.functional.grey[800]};
    background-color: transparent;
    &:hover {
      cursor: pointer;
      background-color: ${({ theme }) => theme.colors.functional.grey[200]};
    }
  }
`;
