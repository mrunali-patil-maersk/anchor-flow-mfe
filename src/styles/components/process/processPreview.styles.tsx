// styled components
import styled from "styled-components";
import { Typography } from "@anchor/react-components/dist/lib/components";

export const ProcessDefinitionPreviewWidget = styled.article`
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.functional.grey["50"]};
  border: 1px solid ${({ theme }) => theme.colors.functional.grey["300"]};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 0 1 355px;
  height: ${(props) => (props.isDetailsPage ? "300px" : "264px")};
  cursor: pointer;
`;

export const ProcessDefinitionPreviewWidgetHeader = styled(Typography)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.functional.grey["300"]};
  padding: 16px;
`;

export const ProcessDefinitionPreviewWidgetFooter = styled(Typography)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 16px;
`;

export const ProcessDefinitionPreviewWidgetFooterIcon = styled.section`
  display: flex;
  align-items: flex-start;
  color: ${({ state, theme }) =>
    state === "Failed"
      ? theme.colors.feedback.danger.normal
      : state === "In progress"
      ? theme.colors.feedback.warning.normal
      : theme.colors.feedback.success.normal};
`;

export const ProcessDefinitionPreviewWidgetImage = styled.div`
  height: 164px;
`;

export const WidgetImageLoader = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: inherit;
`;
