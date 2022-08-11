import { ChangeEvent, useEffect, useMemo, useState } from "react";

import { Box, Button, Select, toastEmitter, Tooltip } from "@anchor/react-components";
import { useAppSelector } from "src/redux/hook";
import { selectUser } from "src/redux/selectors/userSelector";
import {
  GroupListItem,
  SelectAddGroupContainer,
  SelectedGroupListContainer,
  TaskListAddGroupModal,
} from "@styles/components/tasklist/modals/addGroup.style";
import { StyledTypography } from "@styles/components/tasklist/tasklist.style";
import { GroupsAssignedToUserType } from "src/redux/feature/userSlice";
import { groupHintText } from "@/configs/addGroups.contants";
import {
  useAddGroupToTaskMutation,
  useDeleteGroupToTaskMutation,
} from "src/redux/services/tasklistApi";
import InfoBox from "../infoBox";

interface AddGroupPropsType {
  groupsDataValues: [{ groupId: string }];
  taskId: string;
}

interface AddGroupModalBodyPropsType {
  selectedGroupsList: (GroupsAssignedToUserType | null)[];
  taskId: string;
}

interface groupSelectOption {
  value: string;
  label: string;
}

const AddGroupButton = ({
  label,
  tooltipLabel,
  handleClick,
}: {
  label: string;
  tooltipLabel: string;
  handleClick: () => void;
}) => {
  return (
    <Box>
      <Tooltip apperance="inverted" content={tooltipLabel} position="top" width="400px">
        <Button icon="people" size="small" variant="outlined" label={label} onClick={handleClick} />
      </Tooltip>
    </Box>
  );
};

const AddGroupModalBody = ({ selectedGroupsList, taskId }: AddGroupModalBodyPropsType) => {
  const { groups } = useAppSelector(selectUser);
  const [selectOptions, setSelectOptions] = useState<groupSelectOption[]>([]);
  const [selectGroupOption, setSelectGroupOption] = useState<groupSelectOption | null>(null);
  // API
  const [addGroup, { isError: isErrorOnAdd, error: errorOnAdd }] = useAddGroupToTaskMutation();
  const [deleteGroup, { isError: isErrorOnDelete, error: errorOnDelete }] =
    useDeleteGroupToTaskMutation();

  useEffect(() => {
    const groupsSelect = groups
      .filter(
        (item) => !selectedGroupsList.find((selectListGroup) => selectListGroup?.id === item.id)
      )
      .map(({ id, displayName }) => ({ value: id, label: displayName }));

    setSelectOptions(groupsSelect);
  }, [selectedGroupsList, groups]);

  const handleOptionsSelect = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    const { value } = target;
    const selectItem = selectOptions.find((item) => item.value === value);
    setSelectGroupOption(selectItem || null);
  };

  const handleGroupAdd = async () => {
    if (selectGroupOption && selectGroupOption.value) {
      const { label, value } = selectGroupOption;
      // API call Add
      await addGroup({
        taskId: taskId,
        body: {
          groupId: value,
          type: "candidate",
        },
      }).unwrap();
      setSelectGroupOption(null);
      toastEmitter(
        { title: `Successfully added ${label} into group.` },
        {
          type: "success",
          position: "bottom-right",
          toastId: value,
        }
      );
    }
  };

  const handleDeleteGroup = async (groupId: string, displayName: string) => {
    // API call delete
    if (groupId) {
      await deleteGroup({
        taskId: taskId,
        body: {
          groupId: groupId,
          type: "candidate",
        },
      }).unwrap();
      setSelectGroupOption(null);
      toastEmitter(
        { title: `Successfully deleted ${displayName || groupId}.` },
        {
          type: "success",
          position: "bottom-right",
          toastId: groupId,
        }
      );
    }
  };

  const isSelectDisable = selectedGroupsList.length === 5 || selectOptions.length === 0;
  const isAddButtonDisable = selectGroupOption ? false : true;

  const isError = isErrorOnAdd || isErrorOnDelete;
  const errorMesg = (errorOnAdd as any)?.data.errorMesg || (errorOnDelete as any)?.data?.errorMesg;
  let errorText = "Something went wrong!";
  if (isError && errorMesg) {
    errorText = errorMesg || "Something went wrong!";
  }
  return (
    <Box display="flex" flexDirection="column">
      {isError && (
        <Box mb={20}>
          <InfoBox type="error" text={errorText} />
        </Box>
      )}
      <SelectAddGroupContainer>
        <Box flex="1" mr={12} mt={2}>
          <Select
            id="start-process-variable-type"
            label=""
            name="variableType"
            variant="default"
            placeholder="Select group"
            disabled={isSelectDisable}
            options={selectOptions}
            value={selectGroupOption ? [selectGroupOption] : []}
            hintText={groupHintText}
            onChange={handleOptionsSelect}
          />
        </Box>
        <Button
          label="Add"
          disabled={isAddButtonDisable}
          size="medium"
          icon="plus"
          variant="filled"
          onClick={handleGroupAdd}
        />
      </SelectAddGroupContainer>
      <SelectedGroupListContainer>
        {selectedGroupsList.map((item) => {
          if (item) {
            const { id, displayName } = item;
            return (
              <GroupListItem key={id}>
                <StyledTypography variant="body2" fontStyle="normal">
                  {displayName || "-"}
                </StyledTypography>
                <Button
                  label="Delete"
                  hiddenlabel={true}
                  size="small"
                  icon="trash"
                  variant="plain"
                  onClick={() => handleDeleteGroup(item.id, item.displayName)}
                />
              </GroupListItem>
            );
          }
        })}
      </SelectedGroupListContainer>
    </Box>
  );
};

const AddGroup = ({ groupsDataValues, taskId }: AddGroupPropsType) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { groups } = useAppSelector(selectUser);

  const filterGroups = useMemo(
    () =>
      groupsDataValues
        .map((group) => {
          if (!group.groupId) {
            return null;
          }

          const groupAvailable = groups.find((item) => item.id === group.groupId);
          if (groupAvailable) {
            return groupAvailable;
          }
          return {
            id: group.groupId,
            displayName: group.groupId,
          };
        })
        .filter((item) => item),
    [groupsDataValues, groups]
  );
  const groupsLabels = useMemo(() => {
    let groupButtonData = {
      label: "Add Groups",
      tooltipLabel: "Add Groups",
    };

    const length = filterGroups?.length;
    if (length > 0) {
      const tooltipLabel = filterGroups?.map((item) => item?.displayName).join(", ");
      groupButtonData = {
        label: `${groupButtonData.label} (${length})`,
        tooltipLabel: tooltipLabel,
      };
    }
    return groupButtonData;
  }, [filterGroups]);

  const handleToggle = () => {
    setModalOpen((prevState: boolean) => !prevState);
  };

  return (
    <>
      <AddGroupButton
        label={groupsLabels.label}
        tooltipLabel={groupsLabels.tooltipLabel}
        handleClick={handleToggle}
      />
      <TaskListAddGroupModal
        zindex="100000"
        heading="Manage group"
        showCloseIcon={true}
        open={modalOpen}
        onClose={handleToggle}
        size="medium"
      >
        {modalOpen && <AddGroupModalBody taskId={taskId} selectedGroupsList={filterGroups} />}
      </TaskListAddGroupModal>
    </>
  );
};

export default AddGroup;
