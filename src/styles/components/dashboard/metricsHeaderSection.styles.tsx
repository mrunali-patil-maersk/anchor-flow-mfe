// styled components
import styled from "styled-components";
import { Button } from "@anchor/react-components";

export const MetricsHeaderSectionWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MetricsHeaderSectionHeadingH3 = styled.h3`
  padding-bottom: 0.45rem;
  font-family: Maersk Headline;
  font-size: 1.25em;
  font-weight: 300;
  line-height: 1.5em;
  letter-spacing: 0em;
`;

export const MetricsHeaderSectionTabsDiv = styled.div`
  align-self: center;
  justify-self: end;
`;

export const MetricsHeaderSectionTabButton = styled(Button)`
  margin-right: 2rem;
  padding-bottom: ${(p) => (p.active ? "1rem" : "0")};
  border-bottom: ${(p) => (p.active ? ".175rem solid #00243D" : "none")};
  border-radius: 0;
  font-family: Maersk Text;
  font-size: 1em;
  line-height: 1.5em;
  letter-spacing: 0em;
  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background-color: transparent;
  }
`;
