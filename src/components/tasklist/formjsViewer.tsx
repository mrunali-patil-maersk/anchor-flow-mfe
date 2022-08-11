import { MutableRefObject, useEffect, useRef } from "react";
import styled from "styled-components";

// form Modeler
import { Form } from "@bpmn-io/form-js";

import { Data, Errors } from "@bpmn-io/form-js-viewer/dist/types/Form";
import "@bpmn-io/form-js/dist/assets/form-js.css";

export interface SubmitFormType {
  data: Data;
  errors?: Errors;
}
const FormJSContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.functional.grey["50"]};
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.functional.grey["200"]};
  border-radius: 5px;
  .fjs-container {
    --font-family: ${({ theme }) => theme.fonts.body};
    --color-borders: ${({ theme }) => theme.colors.functional.grey["400"]};
    --color-text: ${({ theme }) => theme.colors.functional.grey["800"]};
    --color-borders-disabled: ${({ theme }) => theme.colors.functional.grey["400"]};
    --color-warning: ${({ theme }) => theme.colors.feedback.danger.normal};
  }
  .fjs-container .fjs-button[type="submit"],
  .fjs-container .fjs-button[type="reset"] {
    font-weight: 300;
    border-radius: 4px;
    font-size: 16px;
    line-height: 24px;
    height: 40px;
    cursor: pointer;
    padding: 8px 16px;
  }
  .fjs-container .fjs-button[type="submit"] {
    background-color: ${({ theme }) => theme.colors.primary.blue["300"]};
    color: ${({ theme }) => theme.colors.functional.grey["50"]};
    border-color: ${({ theme }) => theme.colors.functional.grey["50"]};
    &:hover {
      background-color: ${({ theme }) => theme.colors.primary.blue["200"]};
    }
    &:disabled {
      cursor: "not-allowed";
      background-color: ${({ theme }) => `${theme.colors.primary.blue["300"]}80`};
    }
  }
  .fjs-container .fjs-button[type="reset"] {
    background-color: ${({ theme }) => theme.colors.functional.grey["50"]};
    color: ${({ theme }) => theme.colors.functional.grey["800"]};
    border-color: ${({ theme }) => theme.colors.functional.grey["500"]};
    &:hover {
      background-color: ${({ theme }) => theme.colors.functional.grey["200"]};
    }
    &:disabled {
      cursor: "not-allowed";
      background-color: ${({ theme }) => `${theme.colors.functional.grey["100"]}80`};
      border-color: ${({ theme }) => `${theme.colors.functional.grey["400"]}80`};
      color: ${({ theme }) => `${theme.colors.functional.grey["800"]}80`};
    }
  }
  .fjs-container .fjs-input,
  .fjs-container .fjs-textarea,
  .fjs-container .fjs-select {
    height: 40px;
    font-size: 16px;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    transition: 0.2s ease;
    transition-property: border;
    &:focus {
      border-width: 1px;
      border-color: ${({ theme }) => theme.colors.primary.blue["400"]};
      box-shadow: ${({ theme }) => theme.boxShadows.type.basic.default};
    }
  }
`;

const FormjsViewer = ({
  formJSViewer,
  schema,
  initData,
  handleUpdateFormData,
}: {
  formJSViewer: MutableRefObject<Form | undefined>;
  schema: any;
  initData: Data | undefined;
  handleUpdateFormData: (res: SubmitFormType) => void;
}) => {
  const formContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (formContainerRef.current) {
      try {
        const container = formContainerRef.current;
        formJSViewer.current = new Form({ container: container });
        formJSViewer.current.on("submit", 1, handleSubmit);
      } catch (err) {
        console.error("create form failed", err);
      }
    }
    return () => {
      if (formJSViewer.current) {
        formJSViewer.current?.destroy();
        formJSViewer.current.off("submit", handleSubmit);
      }
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (formJSViewer?.current && schema) {
          await formJSViewer?.current?.importSchema(schema, initData);
        }
      } catch (err) {
        console.error("importing form failed", err);
      }
    })();
  }, [initData, schema]);

  const handleSubmit = ({ data, errors }: SubmitFormType) => {
    handleUpdateFormData({ data, errors });
  };

  return <FormJSContainer ref={formContainerRef} />;
};

export default FormjsViewer;
