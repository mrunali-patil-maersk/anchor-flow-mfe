// react
import { useState } from "react";

// components
import {
  Modal,
  Button,
  Checkbox,
  Radio,
  toastEmitter,
  Typography,
  InputNumber,
  Tooltip,
} from "@anchor/react-components";
import { ProcessConfirm, ProcessPadding } from "@styles/components/process/procesModal.styles";

//constants
import {
  apiGateway,
  jobDefinitionsListUrl,
  processChangeJobPriority,
} from "@/configs/apis/apiEndPoints";

// API axios instance
import { callApi } from "@/configs/apis/axiosAPI";
import { getJobDefinitionsListConfig, processPutApiConfig } from "@/configs/actions/process";
import { changeJobConfirm, changeJobHeading, changeJobMessgae } from "@/configs/process.constant";

const ChangeJobPriorityModal = ({
  showModalValue,
  processId,
  handleModalShowHide,
}: {
  showModalValue: boolean;
  processId: any;
  handleModalShowHide: (value) => void;
}) => {
  const [showModal, setShowModal] = useState<boolean>(showModalValue);
  const [excecute, setExecute] = useState("setPriority");
  const [priority, setpriority] = useState("");
  const [includeExisting, setIncludeExisting] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const postModalData = async () => {
    try {
      setIsLoading(true);
      const processDefUrl: string = jobDefinitionsListUrl(processId);
      const processDefconfig: any = getJobDefinitionsListConfig(processDefUrl, 0, 10);
      const processDefResponse = await callApi(apiGateway + processDefUrl, processDefconfig);
      const processDefIds = processDefResponse.map((el) => el.id);
      if (processDefIds.length) {
        const body =
          excecute == "setPriority"
            ? {
                priority: priority,
                includeJobs: includeExisting,
              }
            : {};
        processDefIds.forEach(async (element) => {
          const url: string = processChangeJobPriority(element);
          const config: any = processPutApiConfig(url, body);
          await callApi(apiGateway + url, config);
        });
        toastEmitter(
          {
            title:
              excecute == "setPriority"
                ? `Finished : Overriding the priority completed successfully.`
                : `Finished : Clearing the priority completed successfully.`,
          },
          {
            type: "success",
            position: "bottom-right",
            toastId: "processPostId",
          }
        );
      } else {
        toastEmitter(
          {
            title: `This process definition has no job definitions associated with. The job priority cannot be overridden.`,
          },
          {
            type: "error",
            position: "bottom-right",
            toastId: "processPostId",
          }
        );
      }
      setExecute("setPriority");
      setpriority("");
      handleModalShowHide(false);
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
      heading={changeJobHeading}
      actions={{
        primaryAction: (
          <Button
            label="Override"
            onClick={postModalData}
            disabled={excecute == "setPriority" && !priority.length ? true : false}
          />
        ),

        secondaryAction: (
          <Button variant="outlined" label="Cancel" onClick={() => handleModalShowHide(false)} />
        ),
      }}
      onClose={() => handleModalShowHide(false)}
      width="483px"
      height="530px"
      size="large"
      zindex={99999}
    >
      <div>
        <Typography variant="body1" fontStyle="normal">
          {changeJobMessgae}
        </Typography>
        <ProcessPadding>
          <Radio
            label="Execute"
            name="execute"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setExecute(e.target.value);
            }}
            type="group"
            orientation="vertical"
            options={[
              {
                id: "clearPriority",
                label: "Clear Overriding Job Priority",
                value: "clearPriority",
              },
              {
                id: "setPriority",
                label: "Set Overriding Job Priority",
                value: "setPriority",
              },
            ]}
            value={excecute}
            id="clearPriority"
          />
          {excecute == "setPriority" ? (
            <div>
              <ProcessPadding>
                <InputNumber
                  fit="medium"
                  id="priority"
                  label="Priority (Enter only integer value)"
                  onChange={(e) => {
                    setpriority(e.target.value);
                  }}
                  placeholder="Enter Priority number"
                  value={priority}
                />
              </ProcessPadding>
              <ProcessPadding>
                <Checkbox
                  checked={includeExisting}
                  label="Include Existing Jobs"
                  onChange={(e) => {
                    setIncludeExisting(e.target.checked);
                  }}
                  type="standard"
                  id="includeExisting"
                  name="includeExisting"
                />
              </ProcessPadding>
            </div>
          ) : (
            ""
          )}
        </ProcessPadding>
        <ProcessConfirm variant="body2" fontStyle="bold" div="true">
          {changeJobConfirm}
        </ProcessConfirm>
      </div>
    </Modal>
  );
};

// Protected routes
ChangeJobPriorityModal.requireAuth = true;
export default ChangeJobPriorityModal;
