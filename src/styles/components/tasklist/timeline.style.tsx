// styled components
import styled from "styled-components";

// components
import { StyledTypography } from "./tasklist.style";

export const TimeLineWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TimeLineCards = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
  margin-top: 28px;
`;

export const TimeLineCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0 0 42px 40px;
  ::before {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    left: -11px;
    top: 0px;
    background-color: ${({ theme }) => theme.colors.primary.blue["800"]};
    border-radius: 50%;
  }
  :last-child {
    border-left: 2px solid transparent;
    padding: 0 0 8px 40px;
  }
  border-left: 2px solid ${({ theme }) => theme.colors.primary.blue["800"]};
`;

export const SectionWrrapper = styled.section`
  position: relative;
  height: 200px;
`;

const Grey800StyledTypography = styled(StyledTypography)`
  color: ${({ theme }) => theme.colors.functional.grey["800"]};
`;

export const Time = styled(Grey800StyledTypography)``;

export const OperationType = styled(Grey800StyledTypography)`
  margin-left: 36px;
`;

export const HeaderDate = styled.div`
  display: flex;
  align-items: baseline;
  color: ${({ theme }) => theme.colors.primary.blue["700"]};
  margin-top: 24px;
  span {
    padding-left: 6px;
  }
`;
