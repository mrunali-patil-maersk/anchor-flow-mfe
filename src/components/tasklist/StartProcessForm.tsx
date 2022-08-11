import { Dispatch, SetStateAction } from "react";
import { Box, Typography, Input, Select, Checkbox, Button } from "@anchor/react-components";
import {
  TaskListStartProcessAddVariables,
  TaskListStartProcessModalBannerIcon,
} from "@styles/components/tasklist/modals/startProcess.styles";

export interface RowFromType {
  variableName: string;
  variableType: string;
  variableValue: string;
  isEditMode: boolean;
}

export const initialRowData: RowFromType = {
  variableName: "",
  variableType: "",
  variableValue: "",
  isEditMode: true,
};

const rowHeaders = ["Name", "Type", "Value"];

interface StartProcessForm {
  rowData: RowFromType[];
  setRowData: Dispatch<SetStateAction<RowFromType[]>>;
}

const StartProcessForm = ({ rowData, setRowData }: StartProcessForm) => {
  const handleDataChange = (e, inputType = "text") => {
    let { name, value } = e.target;

    if (inputType === "checkbox") {
      value = e.target.checked ? e.target.checked.toString() : "";
      name = "variableValue";
    }
    setRowData((prevData) =>
      [...prevData].map((row) => (row.isEditMode ? { ...row, [name]: value } : row))
    );
  };

  const handleSelectType = ({ target }) => {
    const { name, value } = target;
    setRowData((prevData) =>
      [...prevData].map((row) =>
        row.isEditMode
          ? {
              ...row,
              variableValue: "",
              [name]: value,
            }
          : row
      )
    );
  };

  const addVariablesRow = () => {
    const isAlreadyRowInEditWithEmpty = rowData.find((row) => row.isEditMode && !row.variableName);
    if (isAlreadyRowInEditWithEmpty) {
      alert("Already row with empty variable!");
      return;
    }
    setRowData((prev) => [
      ...prev.map((row) =>
        row.isEditMode && row.variableName !== "" ? { ...row, isEditMode: false } : row
      ),
      initialRowData,
    ]);
  };

  const removeVariablesRow = (rowIndex: number) => {
    setRowData((prev) => prev.filter((_, index) => index !== rowIndex));
  };

  const editVariablesRow = (rowIndex: number) => {
    setRowData((prev) =>
      prev.map((item, index) =>
        index === rowIndex ? { ...item, isEditMode: true } : { ...item, isEditMode: false }
      )
    );
  };

  //@Todo - add another 3 types after demo
  const typeOptions = ["Boolean", "Short", "Integer", "Long", "Double", "String"];

  return (
    <Box>
      <TaskListStartProcessAddVariables onClick={addVariablesRow}>
        <TaskListStartProcessModalBannerIcon name="plus" />
        <Typography fontStyle="normal" variant="body2">
          Add a variable
        </Typography>
      </TaskListStartProcessAddVariables>
      {rowData?.length > 0 && (
        <Box display="flex" flexDirection="column" px={8}>
          <Box display="flex" my={8}>
            {rowHeaders.map((hText, index) => (
              <Box flex="1" ml={index === 0 ? 0 : 8} key={index}>
                {hText}
              </Box>
            ))}
            <Box width="80px" pl={12} justifyContent="center">
              Action
            </Box>
          </Box>

          {rowData.map((row, index) => {
            return (
              <Box display="flex" key={index} mb={8}>
                <Box flex="1">
                  <Input
                    id="start-process-variable-name"
                    type="text"
                    name="variableName"
                    placeholder="Variable Name"
                    value={row.variableName}
                    onChange={handleDataChange}
                    required={true}
                    disabled={!row.isEditMode}
                  />
                </Box>
                <Box flex="1" ml={8}>
                  <Select
                    id="start-process-variable-type"
                    label=""
                    name="variableType"
                    variant="default"
                    placeholder="Type"
                    disabled={!row.variableName || !row.isEditMode}
                    options={typeOptions}
                    value={[row.variableType]}
                    onChange={(e) => handleSelectType(e)}
                  />
                </Box>
                <Box flex="1" ml={8} alignSelf="flex-end">
                  {row.variableType !== "Boolean" ? (
                    <Input
                      id="start-process-value"
                      type="text"
                      placeholder="Value"
                      name="variableValue"
                      value={row.variableValue}
                      onChange={handleDataChange}
                      disabled={!row.variableType || !row.isEditMode}
                      required={true}
                    />
                  ) : (
                    <Checkbox
                      type="standard"
                      checked={row.variableValue ? true : false}
                      onChange={(e) => handleDataChange(e, "checkbox")}
                      disabled={!row.variableType || !row.isEditMode}
                      id="start-process-value-checkbox"
                      name="variableValue"
                    />
                  )}
                </Box>
                <Box display="flex" width="80px" ml={8} alignItems="center">
                  <Box>
                    <Button
                      icon="pencil"
                      size="small"
                      hiddenlabel={true}
                      onClick={() => editVariablesRow(index)}
                      variant="plain"
                    />
                  </Box>
                  <Box ml={4}>
                    <Button
                      icon="trash"
                      size="small"
                      hiddenlabel={true}
                      onClick={() => removeVariablesRow(index)}
                      variant="plain"
                    />
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default StartProcessForm;
