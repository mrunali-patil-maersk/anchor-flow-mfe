import { LoadingIndicator, Box } from "@anchor/react-components";

const LoadingSpinner = ({
  hiddenLabel = true,
  label = "loading",
}: {
  hiddenLabel?: boolean;
  label?: string;
}) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100%">
      <LoadingIndicator hiddenlabel={hiddenLabel} label={label} />
    </Box>
  );
};

export default LoadingSpinner;
