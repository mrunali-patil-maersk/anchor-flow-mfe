import styled, { css } from "styled-components";

export const FormContentWrapper = styled.div<{
  variant: "disabled" | "default";
}>`
  position: relative;
  ${({ variant }) =>
    variant === "disabled" &&
    css`
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
`;

export const KeyInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  label {
    color: ${({ theme }) => theme.colors.functional.grey[800]};
    font-size: 16px;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  margin-top: 24px;
  margin-left: -2px; // Adjust button issue
  button {
    color: ${({ theme }) => theme.colors.primary.blue[600]};
    padding-left: 0px;
    padding-right: 0px;
    margin-right: 42px;
    :hover {
      color: ${({ theme }) => theme.colors.primary.blue[400]};
      background-color: inherit;
    }
  }
`;

export const FooterWrapper = styled.div`
  display: flex;
  margin-top: 24px;
`;
