// styled components
import styled from "styled-components";
import { Icon } from "@anchor/react-components";
import Link from "next/link";

export const ProcessInstancesSuccessCol = styled.span`
  color: #40ab35;
  display: flex;
`;
export const ProcessInstancesFailedCol = styled.span`
  color: #b80012;
  display: flex;
`;
export const ProcessInstancesCol1 = styled.span<{ state: "Failed" | "Success" | "In progress" }>`
  color: ${({ theme, state }) =>
    state === "Failed"
      ? theme.colors.feedback.danger.normal
      : state === "In progress"
      ? theme.colors.secondary.orange[300]
      : theme.colors.feedback.success.normal};
  display: flex;
  align-items: center;
`;

export const ProcessInstanceColIcon = styled.span`
  margin-right: 6px;
  margin-top: -3px;
  display: flex;
  align-items: center;
`;

export const JobDefinitionActionColIcon = styled(Icon)`
  cursor: pointer;
  color: #00243d;
  &:not(:last-child) {
    margin-right: 0.6rem;
  }
`;

export const ActionColIcon = styled(Icon)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary.blue[900]};
  margin-right: 5px;
  font-size: ${({ theme }) => theme.fontSizes[16]};
`;

export const ActionIconwrapper = styled.span`
  font-size: ${({ theme }) => theme.fontSizes[14]};
  i {
    position: relative;
    top: 2px;
    right: -5px;
  }
  .iconTxt {
    font-size: ${({ theme }) => theme.fontSizes[14]};
  }
`;
