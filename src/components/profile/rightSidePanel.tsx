import { RoleType } from "src/redux/feature/userSlice";

//styles
import {
  RightSidePanelDiv,
  RightSidePanelHeaderH3,
  RightSidePanelBodyTitleH4,
  RightSidePanelBodyDescriptionP,
} from "@styles/components/myProfile/righSidePanel.styles";
import { Tooltip } from "@anchor/react-components";

//interfaces
interface RightSidePanelProps {
  roles: RoleType[];
}

/**
 * @name RightSidePanel
 * @description Method for generating the JSX for the RightSidePanel component
 * @returns JSX for RightSidePanel Component
 */
const RightSidePanel = ({ roles }: RightSidePanelProps) => {
  return (
    <RightSidePanelDiv>
      <RightSidePanelHeaderH3>Roles assigned</RightSidePanelHeaderH3>
      {roles?.map((role, index) => (
        <div key={role.id ?? index}>
          <Tooltip content={role.value}>
            <RightSidePanelBodyTitleH4>{role.displayName}</RightSidePanelBodyTitleH4>
          </Tooltip>
          <RightSidePanelBodyDescriptionP>{role.description}</RightSidePanelBodyDescriptionP>
        </div>
      ))}
    </RightSidePanelDiv>
  );
};

export default RightSidePanel;
