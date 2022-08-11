import { Box, Button } from "@anchor/react-components";
import { FallbackProps } from "./errorBoundary";
import InfoNotification from "./notification";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <Box>
      <InfoNotification
        variant="error"
        body={"Something went wrong!"}
        showClose={false}
      />
      <Box my={16}>
        <code>{error.message}</code>
      </Box>
      <Button onClick={resetErrorBoundary} label="Try again!" />
    </Box>
  );
};

export default ErrorFallback;
