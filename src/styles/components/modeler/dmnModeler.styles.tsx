// styled components
import styled from "styled-components";

// components
import { Modal, Typography } from "@anchor/react-components";

// styles
export const DmnModelerSection = styled.section`
  display: flex;
  flex-direction: column;
`;

export const DmnModelerSectionContainer = styled.section`
  display: flex;
  & .dpp-properties {
    height: 71vh;
    overflow-y: scroll;
    border: 1px solid #cfcfcf;
  }
`;

export const DmnModelerSectionContainerCanvas = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.functional.grey["900"]};
  background: ${({ theme }) => theme.colors.functional.grey["50"]};
  height: 71vh;
  width: 100vw;
`;

export const DmnModelerSectionButtons = styled.section`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;

export const DmnModelerModal = styled(Modal)`
  &&& {
    width: 484px;
  }
`;

export const DmnModelerSectionModal = styled.section`
  display: flex;
  flex-direction: column;
`;

export const DmnModelerSectionModalText = styled(Typography)`
  margin-bottom: 16px;
`;

export const DmnModelerSectionModalInputContainer = styled.div`
  margin-bottom: 16px;
`;
