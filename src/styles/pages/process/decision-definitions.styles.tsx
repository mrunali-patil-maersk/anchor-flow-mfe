// styled components
import styled from "styled-components";
import { Icon } from "@anchor/react-components";

export const DecisionDefinitions = styled.section`
  background: ${({ theme }) => theme.colors.functional.grey["100"]};
  width: ${(props) => (props.sidebarIsExpanded ? "calc(100vw - 270px)" : "calc(100vw - 64px)")};
`;

export const DecisionDefinitionCol1 = styled.span`
  color: #40ab35;
  display: flex;
`;

export const DecisionDefinitionColIcon = styled.span`
  margin-right: 5px;
  padding-top: 2px;
`;

export const DefinitionActionColIcon = styled(Icon)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary.blue[900]};
  margin-right: 5px;
  font-size: 15px;
`;

export const ActionIconwrapper = styled.span`
  font-size: 14px;
  i {
    position: relative;
    top: 2px;
    right: -5px;
  }
  .iconTxt {
    font-size: 14px;
  }
`;
