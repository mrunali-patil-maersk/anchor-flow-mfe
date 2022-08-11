// react
import { useState } from "react";

// components
import { Input, Table } from "@anchor/react-components";

// styles
import {
  ListViewPage,
  ListViewHeaderSpan,
  ListViewSubPage,
  ListViewSearch,
  ListTableWrapper,
} from "../../styles/components/listView/listView.styles";

// interfaces
interface ColumnInterface {
  title?: string;
  slotKey: string;
  width: number;
  isFrozen?: boolean;
  frozenPosition?: string;
  sortable?: boolean;
  isVisible?: boolean;
  left?: number | undefined;
  right?: number | undefined;
  type?: string;
  render?: (row: any, col: any) => JSX.Element;
  label?: string;
  hasSelectAll?: boolean;
}

interface RowInterface {
  email?: string;
  employee_id?: string;
  first_name?: string;
  last_name?: string;
  id?: string;
  state?: string;
  start_time?: string;
  business_key?: string;
  incident_message?: string;
  incident_process_instances?: string;
  incident_timestamp?: string;
  incident_activity?: string;
  incident_failing_activity?: string;
  incident_cause_instance?: string;
  incident_id?: number;
  callProcessDefinition?: string;
  activity?: string;
}

/**
 * @name ListView
 * @description Method for generating the JSX for the ListView
 * @returns JSX
 */
const ListView = ({
  heading,
  subHeading,
  columnData,
  primaryKey,
  rowData,
  searchBarVisibile,
  placeHolder,
  scrollHeight,
}: {
  heading?: string;
  subHeading?: string;
  searchBarVisibile?: boolean;
  rowData: Array<RowInterface>;
  columnData: Array<ColumnInterface>;
  primaryKey: string;
  placeHolder?: string;
  scrollHeight?: string;
}) => {
  const [enteredSearch, setEnteredSearch] = useState<string>("");

  return (
    <ListViewPage>
      {heading ? (
        <ListViewHeaderSpan fontStyle="normal" variant="h3">
          {heading}
        </ListViewHeaderSpan>
      ) : null}
      <ListViewSubPage heading={heading}>
        {subHeading ? (
          <ListViewHeaderSpan fontStyle="normal" variant="h5">
            {subHeading}
          </ListViewHeaderSpan>
        ) : null}
        <ListViewSearch>
          {searchBarVisibile ? (
            <Input
              clearButton
              fit="large"
              id={heading + "_Search"}
              placeholder={placeHolder?.length ? placeHolder : "Search"}
              variant="default"
              value={enteredSearch}
              onChange={({ target: { value } }) => setEnteredSearch(value)}
              onClear={() => setEnteredSearch("")}
            />
          ) : null}
          <ListTableWrapper scrollHeight={scrollHeight}>
            <Table
              defaultColumns={columnData}
              primaryKey={primaryKey}
              rowData={rowData}
              className="table"
              fullWidthTable
            />
          </ListTableWrapper>
        </ListViewSearch>
      </ListViewSubPage>
    </ListViewPage>
  );
};

export default ListView;
