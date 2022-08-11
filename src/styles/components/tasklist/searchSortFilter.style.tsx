import styled from "styled-components";
import { Input } from "@anchor/react-components";

type SortButtonType = {
  $variant: "asc" | "dsc";
};

export const SectionWrapper = styled.section`
  display: flex;
  padding: 16px 24px;
`;

export const SortButton = styled.button<SortButtonType>`
  width: 40px;
  height: 40px;
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.functional.grey[50]};
  border: 1px solid ${({ theme }) => theme.colors.functional.grey[400]};
  box-sizing: border-box;
  border-radius: 4px;
  margin-left: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.functional.grey[200]};
  }
  svg {
    transform: ${({ $variant }) => ($variant === "asc" ? "rotateX(180deg)" : "rotateX(0deg)")};
  }
  path {
    fill: ${({ theme }) => theme.colors.functional.grey[800]};
  }
`;
