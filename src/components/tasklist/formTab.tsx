import { useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { skipToken } from "@reduxjs/toolkit/query/react";
// form Modeler
import Form from "@bpmn-io/form-js-viewer/dist/types/Form";

import { Box, Button, Input, toastEmitter } from "@anchor/react-components";
import {
  FooterWrapper,
  FormContentWrapper,
  KeyInputWrapper,
} from "@styles/components/tasklist/formTab.style";
import InfoBox from "./infoBox";
import {
  useGetTaskFormProcessInstanceQuery,
  useGetTaskFormQuery,
  useGetTaskFormVariablesQuery,
  usePostTaskSubmitFormMutation,
  useSaveTaskFormVariablesMutation,
} from "src/redux/services/tasklistApi";
import LoadingSpinner from "./loadingSpinner";
import { selectUser } from "src/redux/selectors/userSelector";
import { useAppSelector } from "src/redux/hook";
import { useGetFormSchemaQuery } from "src/redux/services/formApi";
import { SubmitFormType } from "@/components/tasklist/formjsViewer";

// dynamic static components
const FormjsViewer = dynamic(() => import("@/components/tasklist/formjsViewer"), {
  ssr: false,
});

const FormTab = ({
  processInstanceId,
  taskId,
  assignee,
  handleReload,
}: {
  processInstanceId: string | null;
  taskId: string;
  assignee: string | null;
  handleReload: () => void;
}) => {
  const isCompleteButtonClick = useRef<boolean>(false);
  const formJSViewer = useRef<Form>();

  const { data: { key } = {}, isLoading: isLoadingFormData } = useGetTaskFormQuery(taskId, {
    skip: !taskId,
  });
  const { data: variablesData } = useGetTaskFormVariablesQuery(taskId, {
    skip: !taskId,
  });

  const {
    data: schema,
    isLoading: isLoadingSchema,
    isError: isSchemaError,
  } = useGetFormSchemaQuery(key, {
    skip: !taskId || !key,
    refetchOnMountOrArgChange: true,
  });

  const { data: { businessKey } = {}, isLoading: isLoadingProcessFormInfo } =
    useGetTaskFormProcessInstanceQuery(processInstanceId ?? skipToken);
  const [postTaskSubmitForm, { isLoading }] = usePostTaskSubmitFormMutation();
  const [saveTaskFormVariables, { isLoading: isLoadingSaveFormVariables }] =
    useSaveTaskFormVariablesMutation();
  const { email: currentUserId } = useAppSelector(selectUser);
  /**  Check current user and enable complete  */

  const isEnableComplete = useMemo(() => {
    return assignee && currentUserId && assignee === currentUserId;
  }, [assignee, currentUserId]);

  const handleComplete = async () => {
    if (isEnableComplete) {
      try {
        isCompleteButtonClick.current = true;
        if (formJSViewer.current) {
          formJSViewer.current.submit();
        } else {
          const data = {};
          handleUpdateFormData({ data });
        }
      } catch (err) {
        isCompleteButtonClick.current = false;
        toastEmitter(
          { title: `Something went wrong!!!` },
          {
            type: "error",
            position: "bottom-right",
            toastId: "form-tab-tasklist-variables",
          }
        );
        console.log("error on submit", err);
      }
    }
  };

  const handleUpdateFormData = async ({ data, errors }: SubmitFormType) => {
    if (isLoading || isLoadingSaveFormVariables) {
      toastEmitter(
        { title: `Wait! Not yet save previous data.` },
        {
          type: "warning",
          position: "bottom-right",
          toastId: "form-tab-tasklist-variables",
        }
      );
      return;
    }
    if (errors && Object.keys(errors).length) {
      isCompleteButtonClick.current = false;
      console.error("Form submitted with errors", errors);
      return;
    }
    try {
      const transferData = Object.entries(data).reduce((acc, [key, value]) => {
        if (!acc[key]) acc[key] = { value };
        return acc;
      }, {});
      if (isCompleteButtonClick.current) {
        isCompleteButtonClick.current = false;
        await postTaskSubmitForm({
          taskId: taskId,
          body: {
            variables: transferData,
          },
        }).unwrap();
        handleReload();
      } else {
        await saveTaskFormVariables({
          taskId: taskId,
          body: {
            modifications: transferData,
          },
        }).unwrap();
      }
      toastEmitter(
        { title: `Successfully save form variables.` },
        {
          type: "success",
          position: "bottom-right",
          toastId: "form-tab-tasklist-variables",
        }
      );
    } catch (err) {
      toastEmitter(
        { title: `Failed to save form variables.` },
        {
          type: "error",
          position: "bottom-right",
          toastId: "form-tab-tasklist-variables",
        }
      );
      console.error("Form not saved", err);
    }
  };

  return (
    <Box py={16}>
      {isLoadingFormData || isLoadingProcessFormInfo || isLoadingSchema ? (
        <Box display="flex" position="relative" height="200px" justifyContent="center">
          <LoadingSpinner />
        </Box>
      ) : (
        <FormContentWrapper variant="default">
          <InfoBox text="You can set variables, using a generic form, by clicking on the link below" />
          {businessKey && (
            <KeyInputWrapper>
              <Input
                fit="medium"
                id="businessKeyInput"
                label="Business Key"
                placeholder="Enter business key"
                type="text"
                variant="default"
                width={70}
                value={businessKey}
                disabled={true}
              />
            </KeyInputWrapper>
          )}
          {!isSchemaError && key && schema && (
            <Box mt={24}>
              <FormjsViewer
                formJSViewer={formJSViewer}
                initData={variablesData}
                schema={schema}
                handleUpdateFormData={handleUpdateFormData}
              />
            </Box>
          )}
          <FooterWrapper>
            <Button
              variant="filled"
              size="medium"
              label="Complete"
              loading={isLoading}
              disabled={isLoading || !isEnableComplete}
              onClick={handleComplete}
            />
          </FooterWrapper>
        </FormContentWrapper>
      )}
    </Box>
  );
};

export default FormTab;
