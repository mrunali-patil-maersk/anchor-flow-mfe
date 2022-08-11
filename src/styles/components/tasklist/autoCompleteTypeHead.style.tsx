import styled, { css } from "styled-components";
import { Icon, Typography } from "@anchor/react-components/dist/lib/components";
export type Variant = "small" | "medium" | "large";

export const Root = styled.div<{ variant: Variant }>`
  position: relative;
  width: ${({ variant }) =>
    variant === "large" ? "320px" : variant === "small" ? "240px" : "280px"};
  font-size: ${({ variant, theme }) =>
    variant === "large"
      ? theme.fontSizes[16]
      : variant === "small"
      ? theme.fontSizes[14]
      : theme.fontSizes[16]};
  font-family: ${({ theme }) => theme.fonts.body};
`;

export const baseButtonMixin = css`
  background: none;
  border: none;
  padding: 0;
`;

export const InputWrapper = styled.div<{ variant: Variant }>`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.functional.grey[400]};
  box-shadow: none;
  outline: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  -webkit-transition: 0.2s ease;
  transition: 0.2s ease;
  -webkit-transition-property: border, background-color;
  transition-property: border, background-color;
  padding: ${({ variant }) =>
    `${variant === "large" ? "4px" : variant === "small" ? "0px" : "0px"} ${
      variant === "large" ? "24px" : variant === "small" ? "10px" : "16px"
    }`};
  font-size: ${({ variant, theme }) =>
    variant === "large"
      ? theme.fontSizes[16]
      : variant === "small"
      ? theme.fontSizes[14]
      : theme.fontSizes[14]};
  font-family: ${({ theme }) => theme.fonts.body};
  > i {
    padding: 0;
  }
  &:active,
  &:focus,
  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary.blue[400]};
    box-shadow: ${({ theme }) => theme.boxShadows.type.basic.default};
  }
`;

export const CloseIcon = styled(Icon)`
  &:hover {
    cursor: pointer;
  }
`;

export const Input = styled.input<{ variant: Variant }>`
  width: 100%;
  min-height: ${({ variant }) =>
    variant === "large" ? "40px" : variant === "small" ? "32px" : "42px"};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: inherit;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 0;
  padding-left: 8px;
  border: none;
  outline: none;
  box-sizing: border-box;
  width: 100%;
  color: ${({ theme }) => theme.colors.functional.grey[800]};
  box-shadow: none;
  font-weight: inherit;
  outline: none;
`;

export const AutoCompleteContainer = styled.ul`
  padding: 8px 0px;
  list-style-type: none;
  width: inherit;
  position: absolute;
  top: 100%;
  left: 0;
  margin: 0;
  margin-top: 8px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.functional.grey[50]};
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.functional.grey[200]};
  box-sizing: border-box;
  box-shadow: ${({ theme }) => theme.boxShadows.card[4]};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

export const AutoCompleteItem = styled.li`
  padding: 4px 16px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.functional.grey[50]};
  box-sizing: border-box;
  cursor: pointer;
  &:active,
  &:hover {
    background-color: ${({ theme }) => theme.colors.functional.grey[200]};
  }
`;

export const AutoCompleteItemButton = styled(Typography)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  display: block;
  color: ${({ theme }) => theme.colors.functional.grey[900]};
`;

export const AutoCompleteItemSubText = styled(AutoCompleteItemButton)`
  color: ${({ theme }) => theme.colors.functional.grey[700]};
`;
