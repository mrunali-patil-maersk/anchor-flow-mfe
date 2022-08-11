import { Box, Icon } from "@anchor/react-components";
import { StyledTypography } from "@styles/components/tasklist/tasklist.style";

const InfoBox = ({
  text,
  type = "info",
}: {
  text: string;
  type?: "info" | "error" | "warning";
}) => {
  const bg = `feedback.${type === "error" ? "danger" : type}.light`;
  let iconName = "info-circle";
  if (type === "error") {
    iconName = "exclamation-octagon";
  } else if (type === "warning") {
    iconName = "exclamation-octagon";
  }
  return (
    <Box display="flex" bg={bg} borderRadius={5} py={14} px={12}>
      <Icon name={iconName} />
      <Box px={8} display="flex" width="100%">
        <StyledTypography variant="body1" fontStyle="normal">
          {text}
        </StyledTypography>
      </Box>
    </Box>
  );
};

export default InfoBox;
