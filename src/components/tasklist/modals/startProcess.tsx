// react
import { Dispatch, SetStateAction, useEffect, useState } from "react";

// components
import { Box, Button, Input, Typography } from "@anchor/react-components";

// styles
import {
  TaskListStartProcessModal,
  TaskListStartProcessModalInput,
  TaskListStartProcessModalBanner,
  TaskListStartProcessStepTwoModalBanner,
  TaskListStartProcessInputBannerContainer,
  TaskListStartProcessModalBannerIcon,
  TaskListProcesses,
  TaskListStartProcessName,
  TaskListStartProcessKeys,
} from "@styles/components/tasklist/modals/startProcess.styles";

import {
  useGetProcessDefinitionsCountQuery,
  useGetProcessDefinitionsListQuery,
  useGetProcessStartFormQuery,
  useSubmitStartFormMutation,
} from "src/redux/services/tasklistApi";
import useDebounce from "@hooks/useDebounce";
import { StyledTypography } from "@styles/components/tasklist/tasklist.style";
import LoadingSpinner from "../loadingSpinner";
import InfoBox from "../infoBox";
import Pagination from "../pagination";
import StartProcessForm, { RowFromType } from "../StartProcessForm";
const MAX_RESULT_PER_PAGE = 15;

// JSX for step one of the start process modal
const StepOneStartProcessModalContent = ({ handleProcessClick }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [startProcessSearchTerm, setStartProcessSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(startProcessSearchTerm, 500);
  const {
    data: { count: totalCount } = {},
    isLoading: isCountLoading,
    isSuccess: isSuccessCountCall,
  } = useGetProcessDefinitionsCountQuery({
    firstResult: (currentPage - 1) * MAX_RESULT_PER_PAGE,
    maxResults: MAX_RESULT_PER_PAGE,
    nameLike: debouncedSearchTerm,
  });

  const {
    data: processDefinitionData = [],
    isLoading: isLoadingProcessDefinitionData,
    isFetching,
    isSuccess: isSuccessProcessDefinition,
  } = useGetProcessDefinitionsListQuery(
    {
      firstResult: (currentPage - 1) * MAX_RESULT_PER_PAGE,
      maxResults: MAX_RESULT_PER_PAGE,
      nameLike: debouncedSearchTerm,
    },
    { skip: !isSuccessCountCall }
  );

  const isDataLoading = () => {
    return isCountLoading || isLoadingProcessDefinitionData || isFetching;
  };

  return (
    <>
      <TaskListStartProcessInputBannerContainer>
        <TaskListStartProcessModalInput>
          <Input
            clearButton
            fit="medium"
            icon="magnifying-glass"
            iconPosition="left"
            id="startProcessTextInput"
            onChange={({ target: { value } }) => setStartProcessSearchTerm(value)}
            onClear={() => setStartProcessSearchTerm("")}
            placeholder="Seach by process name"
            value={startProcessSearchTerm}
            variant="default"
          />
        </TaskListStartProcessModalInput>
        {!isDataLoading() && isSuccessProcessDefinition && processDefinitionData?.length > 0 && (
          <TaskListStartProcessModalBanner>
            <TaskListStartProcessModalBannerIcon name="info-circle" />
            <Typography fontStyle="normal" variant="body2">
              Click on the process to start
            </Typography>
          </TaskListStartProcessModalBanner>
        )}
        {!isDataLoading() && isSuccessProcessDefinition && processDefinitionData?.length === 0 && (
          <Box mt={16} mx={24}>
            <InfoBox text="Note there are no process definitions available." />
          </Box>
        )}
      </TaskListStartProcessInputBannerContainer>

      <TaskListProcesses>
        {isDataLoading() ? (
          <Box height="300">
            <LoadingSpinner />
          </Box>
        ) : (
          processDefinitionData?.length > 0 && (
            <>
              {processDefinitionData.map((item) => {
                return (
                  <section key={item.id} onClick={() => handleProcessClick(item)}>
                    <StyledTypography variant="body2" fontStyle="normal">{`${
                      item.name || item.key || "--"
                    } ${item.tenantId || ""}`}</StyledTypography>
                  </section>
                );
              })}
            </>
          )
        )}
      </TaskListProcesses>
      {!isDataLoading() && totalCount > MAX_RESULT_PER_PAGE && (
        <Box pt={8} px={16}>
          <Pagination
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={MAX_RESULT_PER_PAGE}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </Box>
      )}
    </>
  );
};

// JSX for step two of the start process modal
// renders the variables of the process with Input Component
// user input updates the constants on click of save button
const StepTwoStartProcessModalContent = ({
  processItem,
  businessKeyValue,
  rowData,
  setRowData,
  setBusinessKeyValue,
  setIsLoading,
}: {
  processItem: any;
  businessKeyValue: string;
  setBusinessKeyValue: (value: string) => void;
  setIsLoading: (value: boolean) => void;
  rowData: RowFromType[];
  setRowData: Dispatch<SetStateAction<RowFromType[]>>;
}) => {
  const { data: { key } = {}, isLoading } = useGetProcessStartFormQuery(processItem.id, {
    skip: !processItem.id,
  });

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <Box height={150}>
          <LoadingSpinner />
        </Box>
      )}
      {!isLoading && (
        <>
          <TaskListStartProcessStepTwoModalBanner stepTwo={true}>
            <TaskListStartProcessModalBannerIcon name="info-circle" />
            <Typography fontStyle="normal" variant="body2">
              You can set variables, using a generic form, by clicking the “Add a variable” link
            </Typography>
          </TaskListStartProcessStepTwoModalBanner>
          <TaskListStartProcessName fontStyle="bold" variant="h6">
            {processItem.name || processItem.key}
          </TaskListStartProcessName>
          <TaskListStartProcessKeys>
            <Input
              id="process-business-key"
              fit="medium"
              label="Business key"
              placeholder="Enter business key"
              value={businessKeyValue}
              variant="default"
              onChange={({ target: { value } }) => setBusinessKeyValue(value)}
            />

            <StartProcessForm rowData={rowData} setRowData={setRowData} />
          </TaskListStartProcessKeys>
        </>
      )}
    </>
  );
};

const StartProcessModal = ({
  modalOpen,
  closeModal,
}: {
  modalOpen: boolean;
  closeModal: (modalOpen: boolean) => void;
}) => {
  const [processItem, setProcessItem] = useState<any>({});
  const [startProcessStep, setStartProcessStep] = useState<number>(1);
  const [businessKeyValue, setBusinessKeyValue] = useState("");
  const [submitStartForm, { isLoading: isSubmitLoading }] = useSubmitStartFormMutation();
  const [isLoading, setIsLoading] = useState(true);
  const [rowData, setRowData] = useState<RowFromType[]>([]);

  // method used to update the state when user selects process in the first step
  const handleProcessClick = (item: any) => {
    setProcessItem(item);
    setStartProcessStep(2);
  };

  // fetches the methods to render JSX based on the steps for start process modal
  const getStartProcessModalContent = () => {
    switch (startProcessStep) {
      default:
        return <StepOneStartProcessModalContent handleProcessClick={handleProcessClick} />;
      case 1:
        return <StepOneStartProcessModalContent handleProcessClick={handleProcessClick} />;
      case 2:
        return (
          <StepTwoStartProcessModalContent
            processItem={processItem}
            businessKeyValue={businessKeyValue}
            setBusinessKeyValue={setBusinessKeyValue}
            setIsLoading={setIsLoading}
            rowData={rowData}
            setRowData={setRowData}
          />
        );
    }
  };

  // closes the modal with resetting the status for search term and the number of process step
  const cancelStartProcessModal = () => {
    setBusinessKeyValue("");
    setStartProcessStep(1);
    setIsLoading(true);
    setRowData([]);
    closeModal(false);
  };

  // updates the user input on the variables of the process constants on click of save button
  // closes the modal
  const handleStartProcessModalSave = async () => {
    try {
      const data = {
        id: processItem.id as string,
        body: {
          ...(businessKeyValue ? { businessKey: businessKeyValue } : {}),
          // Todo - Form implementation required
          variables:
            rowData?.length > 0
              ? rowData.reduce((acc, rowItem) => {
                  let rowProcessData = {};
                  if (rowItem.variableValue !== "") {
                    rowProcessData = {
                      [rowItem.variableName]: {
                        type: rowItem.variableType,
                        value: rowItem.variableValue,
                      },
                    };
                  }
                  return { ...acc, ...rowProcessData };
                }, {})
              : {},
        },
      };
      await submitStartForm(data).unwrap();
      cancelStartProcessModal();
    } catch (err) {
      console.error(err);
      // Todo toast need to be add here
      alert("Something went wrong!!!");
      cancelStartProcessModal();
    }
    //cancelStartProcessModal();
  };

  const isStartButtonDisabled = rowData.some((row: RowFromType) => row.variableValue === "");

  return (
    <TaskListStartProcessModal
      zindex="999999"
      heading="Start process"
      showCloseIcon={true}
      open={modalOpen}
      onClose={() => cancelStartProcessModal()}
      actions={
        startProcessStep === 2 &&
        !isLoading && {
          primaryAction: (
            <Button
              disabled={isStartButtonDisabled}
              label="Start"
              onClick={() => handleStartProcessModalSave()}
            />
          ),
          secondaryAction: (
            <Button variant="outlined" label="Cancel" onClick={() => cancelStartProcessModal()} />
          ),
          tertiaryAction: (
            <Button variant="plain" label="Back" onClick={() => setStartProcessStep(1)} />
          ),
        }
      }
      size="medium"
    >
      {modalOpen ? getStartProcessModalContent() : ""}
    </TaskListStartProcessModal>
  );
};

export default StartProcessModal;
