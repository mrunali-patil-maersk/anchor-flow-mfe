// styled components
import styled from "styled-components";
import { Icon } from "@anchor/react-components";

export const DeployedSectionWrapper = styled.section`
  padding: 1rem 1.5rem;
  background: #fff;
  border-radius: 0.3125rem;
  box-shadow: 0px 9px 12px 1px rgb(1 1 1 / 13%);
  font-family: "Maersk Headline";
`;

export const DeployedSectionHeader = styled.h3`
  margin-bottom: 0.5rem;
  padding-bottom: 1rem;
  border-bottom: 0.0625rem solid #dbdbdb;
  font-family: Maersk Headline;
  font-size: 1.25em;
  font-weight: 300;
  line-height: 1.5em;
  letter-spacing: 0em;
  text-align: left;
`;

export const DeployedSectionBodyContentDiv = styled.div`
  display: flex;
  padding: 1rem 0;
  align-content: center;
  align-items: center;

  &:not(:last-child) {
    border-bottom: 1px solid #ededed;
  }
`;

export const DeployedSectionBodyCountSpan = styled.span`
  color: #003d6d;
  font-family: Maersk Headline;
  font-size: 2.5em;
  font-weight: 300;
  line-height: 40px;
  letter-spacing: 0em;
  text-align: left;
  margin-right: 12px;
`;

export const DeployedSectionBodyLinkSpan = styled.span`
  align-self: center;
  font-family: Maersk Text;
  font-size: 1em;
  line-height: 1.5em;
  letter-spacing: 0em;
  text-align: left;
  cursor: pointer;
`;

export const ArrowRightIcon = styled(Icon)`
  align-self: center;
  margin-left: auto;
  cursor: pointer;
`;

export const DeployedSectionBody = styled.div`
  margin-top: 0.7rem;

  &:not(:last-child) {
    border-bottom: 1px solid #ededed;
  }
`;
