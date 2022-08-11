// styled components
import { Box } from "@anchor/react-components";
import styled from "styled-components";

export const DashboardWrapper = styled.div`
  padding: 1.5rem;
  background: #fafafa;
  overflow-x: auto;
`;

export const DashboradHeaderH1 = styled.h1`
  margin-bottom: 1.5rem;
  font-family: "Maersk Headline";
  font-size: 2.5em;
  font-weight: 300;
  line-height: 40px;
  letter-spacing: 0em;
`;

export const DashboardBody = styled(Box)`
  display: grid;
  grid-template-columns: 3fr 1.25fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  width: 100%;
`;
