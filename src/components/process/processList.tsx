// components
import { Table } from "@anchor/react-components";

// styles
import { ListTableWrapper } from "src/styles/components/process/processList.styles";

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

/**
 * @name ProcessList
 * @description Method for generating the JSX for the Process List View
 * @returns JSX
 */
const ProcessList = ({
  rowData,
  columnData,
  primaryKey,
}: {
  rowData: Array<any>;
  columnData: Array<ColumnInterface>;
  primaryKey: string;
}) => {
  return (
    <ListTableWrapper>
      <Table
        defaultColumns={columnData}
        primaryKey={primaryKey}
        className="table"
        rowData={rowData}
        fullWidthTable
      />
    </ListTableWrapper>
  );
};

export default ProcessList;
