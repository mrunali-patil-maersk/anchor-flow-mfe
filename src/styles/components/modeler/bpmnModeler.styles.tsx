// styled-component
import styled from "styled-components";

// components
import { Modal, Typography } from "@anchor/react-components";

export const BpmnModeler = styled.section`
  display: flex;
  flex-direction: column;
`;

export const BpmnModelerContainer = styled.section`
  display: flex;
  & .bpp-properties {
    height: 71vh;
    overflow-y: scroll;
    border: 1px solid #cfcfcf;
  }
`;

export const BpmnModelerContainerCanvas = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.functional.grey["900"]};
  background: ${({ theme }) => theme.colors.functional.grey["50"]};
  height: 71vh;
  width: 100vw;
`;

export const BpmnModelerButtons = styled.section`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;

export const BpmnModelerModal = styled(Modal)`
  &&& {
    width: 484px;
  }
`;

export const BpmnModelerSectionModal = styled.section`
  display: flex;
  flex-direction: column;
`;

export const BpmnModelerSectionModalText = styled(Typography)`
  margin-bottom: 16px;
`;

export const BpmnModelerSectionModalInputContainer = styled.div`
  margin-bottom: 16px;
`;
