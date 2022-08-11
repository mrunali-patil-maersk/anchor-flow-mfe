// styled components
import styled from "styled-components";
import { Typography } from "@anchor/react-components";

export const ProcessInstanceAssignee = styled.span`
  display: flex;
  color: ${({ theme }) => theme.colors.primary.blue[900]};
`;
export const ProcessInstanceAlignSuspendedIcon = styled(Typography)`
  color: ${({ theme }) => theme.colors.primary.blue[600]};
`;
export const ProcessInstanceAlignPauseIcon = styled.span`
  padding-right: 12px;
`;
