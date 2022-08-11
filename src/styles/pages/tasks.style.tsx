// styled components
import styled from "styled-components";

// components
import { Box, Button } from "@anchor/react-components";

export const TasksContainer = styled(Box)`
  display: grid;
  height: inherit;
  grid-template-areas:
    "taskheader"
    "taskmain";
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
  overflow: hidden;
`;

export const TasksPage = styled(Box)`
  width: 100%;
  overflow: hidden;
  height: calc(100vh - 124px);
  #__next > & {
    height: 100vh;
    padding-top: 16px;
    ${TasksContainer} {
      padding-bottom: 32px;
    }
  }
`;

export const TaskHeadContainer = styled(Box)`
  grid-area: taskheader;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.primary.blue["900"]};
  h3 {
    font-weight: 300;
  }
`;

export const TaskHeadContainerButtons = styled.section`
  display: flex;
  align-items: center;
`;

export const TaskHeadStartProcessButton = styled(Button)`
  margin-left: 16px;
`;

export const TaskMainCard = styled(Box)`
  grid-area: taskmain;
  display: grid;
  grid-template-areas:
    "taskhead taskhead"
    "tasklist taskdetails";
  grid-template-rows: auto 1fr;
  grid-template-columns: minmax(240px, 320px) 1fr;
  background-color: ${({ theme }) => theme.colors.functional.grey["50"]};
  box-shadow: ${({ theme }) => theme.boxShadows.card["6"]};
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.functional.grey["200"]};
  border-radius: 5px;
  overflow: hidden;
`;

export const TaskListHeadContainer = styled(Box)`
  grid-area: taskhead;
  border-bottom: 1px solid;
  border-bottom-color: ${({ theme }) => theme.colors.functional.grey["300"]};
`;

export const TaskListContainer = styled(Box)`
  grid-area: tasklist;
  border-right: 1px solid;
  border-right-color: ${({ theme }) => theme.colors.functional.grey["300"]};
  overflow: hidden;
`;

export const TaskListDetailsContainer = styled(Box)`
  grid-area: taskdetails;
  overflow: hidden;
  overflow-y: auto;
  overflow-x: auto;
  height: 100%;
  width: 100%;
`;

export const TaskListWrapperScroll = styled(Box)`
  overflow-y: auto;
  height: 100%;
  overflow-x: hidden;
`;

export const PaginationBox = styled(Box)`
  position: relative;
  background-color: ${({ theme }) => theme.colors.functional.grey["50"]};
  box-shadow: ${({ theme }) => theme.boxShadows.card["6"]};
  border: 1px solid transparent;
  border-top-color: ${({ theme }) => theme.colors.functional.grey["200"]};
`;
