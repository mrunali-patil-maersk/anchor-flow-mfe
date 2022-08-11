import styled from "styled-components";
import { Notification } from "@anchor/react-components";
import { NotificationProps } from "@anchor/react-components/dist/lib/components/Notification";

const StyledNotification = styled(Notification)`
  margin-top: 28px;
  div:empty {
    display: none;
  }
  > button {
    align-self: center;
  }
`;

const InfoNotification = (props: NotificationProps) => {
  return <StyledNotification variant="info" showClose {...props} />;
};

export default InfoNotification;
