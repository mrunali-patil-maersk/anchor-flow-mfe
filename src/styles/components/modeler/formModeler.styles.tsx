// styled components
import styled from "styled-components";
import { Modal } from "@anchor/react-components";

export const FormModeler = styled.div`
  display: grid;
  grid-area: formmain;
  grid-template-areas:
    "formbuilder"
    "formbuttons";
  grid-template-rows: 1fr auto;
  grid-template-columns: 1fr;
  padding-bottom: 12px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.functional.grey["50"]};
  box-shadow: ${({ theme }) => theme.boxShadows.card["4"]};
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.functional.grey["200"]};
  border-radius: 5px;
  overflow: hidden;
`;

export const FormBuilderContainer = styled.div`
  display: grid;
  grid-area: formbuilder;
  overflow: hidden;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.functional.grey["200"]};
  > div {
    overflow: auto;
  }
  .fjs-editor-container .fjs-palette-field {
    &:last-child {
      border-bottom: 0;
    }
  }
`;

export const FormModelerButtons = styled.div`
  padding: 12px 12px 0px 12px;
  grid-area: formbuttons;
  align-items: center;
  justify-content: space-between;
  display: flex;
  gap: 12px;
`;

export const RightButtons = styled.div`
  display: flex;
  gap: 12px;
`;

export const FormModelerModal = styled(Modal)`
  &&& {
    width: 484px;
    max-height: 549px;
    height: auto;
  }
`;
