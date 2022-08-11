// styled components
import styled from "styled-components";

// components
import { Icon, Modal, Typography } from "@anchor/react-components";

export const TaskListStartProcessModal = styled(Modal)`
  &&& {
    width: 560px;
    max-height: 549px;
    height: auto;
  }
  & > div {
    overflow-y: hidden;
  }
`;

export const TaskListStartProcessInputBannerContainer = styled.section`
  background: ${({ theme }) => theme.colors.functional.grey["50"]};
  position: absolute;
  left: 0;
  right: 0;
  z-index: 99;
  top: 60px;
`;

export const TaskListStartProcessModalInput = styled.section`
  padding: 0 24px;
`;

export const TaskListStartProcessModalBanner = styled.section`
  display: flex;
  background: ${({ theme }) => theme.colors.functional.grey["100"]};
  padding: 8px;
  padding-left: 24px;
  margin-top: ${(props) => (props.stepTwo ? "0" : "12px")};
`;

export const TaskListStartProcessStepTwoModalBanner = styled.section`
  display: flex;
  background: ${({ theme }) => theme.colors.functional.grey["100"]};
  padding: 8px;
  padding-left: 24px;
  position: absolute;
  left: 0;
  right: 0;
`;

export const TaskListStartProcessModalBannerIcon = styled(Icon)`
  margin-right: 8px;
`;

export const TaskListProcesses = styled.section`
  margin-top: 96px;
  overflow-y: auto;
  height: 300px;

  & section {
    padding: 12px 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.functional.grey["400"]};
    color: ${({ theme }) => theme.colors.primary.blue["700"]};
    cursor: pointer;
    display: flex;
    width: 100%;
    &:hover {
      background-color: ${({ theme }) => `${theme.colors.primary.blue["50"]}50`};
    }
  }
`;

export const TaskListStartProcessName = styled(Typography)`
  margin-top: 56px;
`;

export const TaskListStartProcessKeys = styled.section`
  margin-top: 16px;
  margin-bottom: 16px;
  overflow-y: auto;
  max-height: 300px;
  height: 100%;
`;

export const TaskListStartProcessAddVariables = styled.section`
  color: ${({ theme }) => theme.colors.primary.blue["600"]};
  margin-top: 24px;
  display: flex;
  align-items: center;

  & i,
  span {
    cursor: pointer;
  }
`;
