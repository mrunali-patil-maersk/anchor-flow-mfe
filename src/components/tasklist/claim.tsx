import { Box } from "@anchor/react-components";
import { uniqueId } from "lodash";
import { useMemo } from "react";
import { useAppSelector } from "src/redux/hook";
import { selectGroupsMembers } from "src/redux/selectors/memebrsSelector";
import { selectUser } from "src/redux/selectors/userSelector";
import {
  useAssigneeTaskMutation,
  useClaimTaskMutation,
  useUnClaimTaskMutation,
} from "src/redux/services/tasklistApi";
import { isValidEmail } from "src/utils/utils";
import AutoCompleteTypeHead, {
  DefaultDataType,
  IData,
} from "../autoCompleteTypeHead/autoCompleteTypeHead";

interface ClaimProps {
  userId: string | null;
  taskId: string;
}

const Claim = ({ userId, taskId }: ClaimProps) => {
  const [claimTask] = useClaimTaskMutation();
  const [unClaimTask] = useUnClaimTaskMutation();
  const [assigneeTask] = useAssigneeTaskMutation();
  const { email, name } = useAppSelector(selectUser);
  const { members } = useAppSelector(selectGroupsMembers);

  const isValidUserId = useMemo(() => isValidEmail(userId ?? ""), [userId]);

  const claimButtonTextObj = useMemo(() => {
    const labelObj = { label: "", value: "" };
    const currentMember =
      isValidUserId && userId !== null
        ? members.find((member) => member.email === userId)
        : userId !== null
        ? {
            name: userId ?? "",
            email: "",
            id: uniqueId,
          }
        : null;
    if (currentMember) {
      labelObj.label =
        currentMember.name?.length > 20
          ? `${currentMember.name.substring(0, 20)}...`
          : currentMember.name;
      labelObj.value = currentMember.name;
    }
    return labelObj;
  }, [userId, members, isValidUserId]);

  const claimUserById = async (emailId: string) => {
    try {
      if (userId === emailId) return;
      if (!userId && emailId === email) {
        await claimTask({
          taskId: taskId,
          body: {
            userId: emailId,
          },
        }).unwrap();
      } else {
        await assigneeTask({
          taskId: taskId,
          body: {
            userId: emailId,
          },
        }).unwrap();
      }
    } catch (err) {
      //@Todo Toast add
      alert("Something went wrong!");
      console.error(err);
    }
  };

  const unClaim = async () => {
    if (userId) {
      try {
        await unClaimTask({
          taskId: taskId,
        }).unwrap();
      } catch (err) {
        //@Todo Toast add
        alert("Something went wrong!");
        console.error(err);
      }
    }
  };

  const defaultData = [
    {
      id: "unassigned",
      text: "Unassigned",
      value: "",
    },
    {
      id: email,
      text: `${name} (claim)`,
      value: name,
    },
  ];

  const autoCompleteData = members
    .filter((m) => m.email !== email)
    .map((m) => ({
      id: m.id,
      text: m.name,
      subText: m.email,
      value: m.email,
    }));

  const handleOnSelect = (item: IData | DefaultDataType) => {
    if (item.value === "") {
      // unclaim
      unClaim();
      return;
    }
    if (item.value === name) {
      //current user
      claimUserById(email);
      return;
    }
    if (item.value && item.value !== name) {
      //other user
      claimUserById(item.value);
      return;
    }
  };

  return (
    <Box>
      <AutoCompleteTypeHead
        data={autoCompleteData}
        defaultData={defaultData}
        value={isValidUserId ? claimButtonTextObj.value : ""}
        icon="user-circle"
        buttonLabel={claimButtonTextObj.label || "Add Assignee"}
        buttonLabelTooltip={claimButtonTextObj.value || "Click here to assign task."}
        onSelect={handleOnSelect}
      />
    </Box>
  );
};

export default Claim;
