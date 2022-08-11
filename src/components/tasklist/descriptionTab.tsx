import { Box, Typography } from "@anchor/react-components";
import InfoBox from "./infoBox";

const DescriptionTab = ({ description }: { description: string | null }) => {
  return (
    <Box py={16}>
      {description ? (
        <Box color="functional.grey.800">
          <Typography variant="body2" fontStyle="normal" paragraph={true}>
            {description}
          </Typography>
        </Box>
      ) : (
        <InfoBox text="Note there is no description of the task." />
      )}
    </Box>
  );
};

export default DescriptionTab;
