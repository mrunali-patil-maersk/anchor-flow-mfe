// styled components
import styled from "styled-components";
import { Icon } from "@anchor/react-components";

export const NotificationSectionWrapper = styled.section`
  grid-row: 1 / 3;
  grid-column: 2 / 3;
  padding: 1rem 1.5rem;
  background: #fff;
  border-radius: 0.3125rem;
  box-shadow: 0px 9px 12px 1px rgb(1 1 1 / 13%);
  font-family: "Maersk Headline";
`;

export const NotificationSectionHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  padding-bottom: 1rem;
  border-bottom: 0.0625rem solid #dbdbdb;
`;

export const HeaderSectionEastSideContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const NotificationSectionHeadingH3 = styled.h3`
  font-family: Maersk Headline;
  font-size: 1.25em;
  font-weight: 300;
  line-height: 1.5em;
  letter-spacing: 0em;
  text-align: left;
`;

export const NotificationSectionMsgCountSpan = styled.span`
  align-self: center;
  padding: 0.2rem 0.8rem;
  background-color: #ededed;
  border-radius: 1rem;
  font-family: Maersk Text;
  font-size: 0.75em;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: center;
`;

export const ArrowRightIcon = styled(Icon)`
  align-self: center;
  margin-left: auto;
  cursor: pointer;
`;

export const HeaderSectionWestSideContainer = styled.div``;

export const NotificationSectionBodyDiv = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;

  &:not(:last-child) {
    border-bottom: 1px solid #ededed;
  }
`;

export const NotificationSectionIcon = styled(Icon)`
  height: fit-content;
  padding: 0.22rem;
  background-color: ${(props) => props.color};
  border-radius: 1rem;
`;

export const NotificationSectionBodyDescDiv = styled.div`
  font-family: Maersk Text;
  font-size: 0.875em;
  line-height: 20px;
  letter-spacing: 0em;
`;

export const NotificationArrivalTimeSpan = styled.span`
  color: #878787;
`;
