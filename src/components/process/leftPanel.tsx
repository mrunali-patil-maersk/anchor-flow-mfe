// components
import { Box, Typography, Select } from "@anchor/react-components";

// interfaces
interface LeftPanelProps {
  isActive: boolean;
  data: {
    label: string;
    value?: string | number | null;
    subLabel?: [];
  }[];
}

//styles
import { LeftPanelWrapper } from "@styles/components/process/processLeftPanel";

const LeftPanel = ({ isActive, data }: LeftPanelProps) => {
  const getValue = (data) => {
    if (data?.type === "selectBox") {
      return (
        <Box mt={5} width={1 / 2.5}>
          {/* TODO: Select Options are static for now! */}
          <Select
            id="selectpicker"
            label=""
            name="version"
            options={["Null", "1", "2", "3"]}
            placeholder=""
            value={[`${data.value || "Null"}`]}
            variant="default"
          />
        </Box>
      );
    } else if (data.subLabel?.length > 0) {
      return data.subLabel.map((e: any) => (
        <Box key={e.label}>
          <Typography variant="body2">{`${e.label}: ${e.value || "-"}`}</Typography>
        </Box>
      ));
    } else {
      return <Typography variant="body2">{data.value || "-"}</Typography>;
    }
  };

  return (
    <LeftPanelWrapper border_direction="right" isActive={isActive}>
      {data?.map((e: any) => (
        <Box mb={15} key={e.label}>
          <Typography variant="h6">{e.label}</Typography>
          {getValue(e)}
        </Box>
      ))}
    </LeftPanelWrapper>
  );
};

export default LeftPanel;
