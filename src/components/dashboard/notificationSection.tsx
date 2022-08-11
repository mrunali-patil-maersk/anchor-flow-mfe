// next
import NextLink from "next/link";

// constants
import { error, info, success, warning } from "src/configs/dashboard.constants";

// interface
interface NotificationMsgType {
  id: number;
  type: string;
  description: string;
  time: string;
}

interface NotificationSectionPropsType {
  notificationSectionData: { totalNotifications: string; notifications: NotificationMsgType[] };
}

// styles
import {
  ArrowRightIcon,
  HeaderSectionEastSideContainer,
  HeaderSectionWestSideContainer,
  NotificationArrivalTimeSpan,
  NotificationSectionBodyDescDiv,
  NotificationSectionBodyDiv,
  NotificationSectionHeaderDiv,
  NotificationSectionHeadingH3,
  NotificationSectionIcon,
  NotificationSectionMsgCountSpan,
  NotificationSectionWrapper,
} from "@styles/components/dashboard/notificationSection.styles";

/**
 * @name getIconDataBasedOnNotificationType
 * @description Method for generating icon and icon color based on notification type
 * @param type
 * @returns object with two properties i.e. icon and color
 */
const getIconDataBasedOnNotificationType = (type: string) => {
  switch (type) {
    case info:
      return { icon: "bell", color: "#B5E0F5" };
    case success:
      return { icon: "check-circle", color: "#C5E5C2" };
    case warning:
      return { icon: "exclamation-circle", color: "#FFEBA8" };
    case error:
      return { icon: "exclamation-octagon", color: "#E9B2B7" };
    default:
      return { icon: "bell", color: "#B5E0F5" };
  }
};

/**
 * @name NotificationSection
 * @description Method for generating the JSX for the NotificationSection component
 * @returns JSX for NotificationSection component
 */
const NotificationSection = ({ notificationSectionData }: NotificationSectionPropsType) => {
  return (
    <NotificationSectionWrapper>
      <NotificationSectionHeaderDiv>
        <HeaderSectionEastSideContainer>
          <NotificationSectionHeadingH3>Notification</NotificationSectionHeadingH3>
          <NotificationSectionMsgCountSpan>
            {notificationSectionData.totalNotifications}
          </NotificationSectionMsgCountSpan>
        </HeaderSectionEastSideContainer>
        <HeaderSectionWestSideContainer>
          <NextLink href="">
            <a>
              <ArrowRightIcon name="arrow-right" />
            </a>
          </NextLink>
        </HeaderSectionWestSideContainer>
      </NotificationSectionHeaderDiv>

      {notificationSectionData?.notifications?.map((data) => {
        const { icon, color } = getIconDataBasedOnNotificationType(data.type);
        return (
          <NotificationSectionBodyDiv key={data.id}>
            <NotificationSectionIcon name={icon} color={color}></NotificationSectionIcon>
            <NotificationSectionBodyDescDiv>
              <p>{data.description}</p>
              <NotificationArrivalTimeSpan>{data.time}</NotificationArrivalTimeSpan>
            </NotificationSectionBodyDescDiv>
          </NotificationSectionBodyDiv>
        );
      })}
    </NotificationSectionWrapper>
  );
};

export default NotificationSection;
