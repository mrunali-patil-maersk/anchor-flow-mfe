// react
import { useState } from "react";

// components
import {
  Modal,
  Button,
  Checkbox,
  Radio,
  InputDate,
  toastEmitter,
  Typography,
} from "@anchor/react-components";
import { ProcessConfirm, ProcessPadding } from "@styles/components/process/procesModal.styles";

//date util function
import { getServerFormattedDate } from "src/utils/dateTimeUtils";

//constants
import { apiGateway, processDefSuspend } from "@/configs/apis/apiEndPoints";

// API axios instance
import { callApi } from "@/configs/apis/axiosAPI";
import { processPutApiConfig } from "@/configs/actions/process";

//to do interface for execute
const ProcessModal = ({
  showModalValue,
  processObject,
  suspendState,
  processId,
  onHandlePageReload,
  handleModalShowHide,
}: {
  showModalValue: boolean;
  processObject: any;
  suspendState: boolean;
  processId: any;
  onHandlePageReload: (processExcecute) => void;
  handleModalShowHide: (value) => void;
}) => {
  const [showModal, setShowModal] = useState<boolean>(showModalValue);
  const [excecute, setExecute] = useState("immediately");
  const [instances, setInstances] = useState<boolean>(true);
  const [delayedTime, setDelayedTime] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const postModalData = async () => {
    try {
      setIsLoading(true);

      const url: string = processDefSuspend(processId);
      const body = {
        suspended: suspendState,

        includeProcessInstances: instances,

        executionDate: excecute == "delayed" ? getServerFormattedDate(new Date(delayedTime)) : "",
      };

      const config: any = processPutApiConfig(url, body);
      await callApi(apiGateway + url, config);
      toastEmitter(
        {
          title:
            excecute == "immediately"
              ? `Finished : Updated the state of the process definition.`
              : `Finished : The state alter of the process definition has been scheduled to ${body.executionDate} successfully.`,
        },
        {
          type: "success",
          position: "bottom-right",
          toastId: "processPostId",
        }
      );
      setExecute("immediately");
      setInstances(true);
      setDelayedTime("");
      onHandlePageReload(excecute);
    } catch (error) {
      toastEmitter(
        { title: `Failed to update state of the process definition` },
        {
          type: "error",
          position: "bottom-right",
          toastId: "processPostId",
        }
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      open={showModal}
      heading={processObject.processHeading}
      actions={{
        primaryAction: <Button label={processObject.processSaveText} onClick={postModalData} />,

        secondaryAction: (
          <Button variant="outlined" label="Cancel" onClick={() => handleModalShowHide(false)} />
        ),
      }}
      onClose={() => handleModalShowHide(false)}
      width="483px"
      height="480px"
      size="large"
      zindex={99999}
    >
      <div>
        <Typography variant="body1" fontStyle="normal">
          {processObject.processMessage}
        </Typography>
        <ProcessPadding>
          <Checkbox
            checked={instances}
            label="Include Instance"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInstances(e.target.checked);
            }}
            type="standard"
            id="instances"
            name="instances"
          />
        </ProcessPadding>
        <ProcessPadding>
          <Radio
            label="Execute"
            name="execute"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setExecute(e.target.value);
            }}
            type="group"
            options={[
              {
                id: "immediately",
                label: "Immediately",
                value: "immediately",
              },
              {
                id: "delayed",
                label: "Delayed",
                value: "delayed",
              },
            ]}
            value={excecute}
            id="immediately"
          />
          {excecute == "delayed" ? (
            <ProcessPadding>
              <InputDate
                fit="medium"
                id="dateInput"
                label="Schedule At"
                onChange={(e) => {
                  setDelayedTime(e.target.value);
                }}
                required
                type="datetime-local"
                value={delayedTime}
                width={50}
              />
            </ProcessPadding>
          ) : (
            ""
          )}
        </ProcessPadding>
        <ProcessConfirm variant="body2" fontStyle="bold" div="true">
          {" "}
          {processObject.processConfirm}
        </ProcessConfirm>
      </div>
    </Modal>
  );
};

// Protected routes
ProcessModal.requireAuth = true;
export default ProcessModal;
