// interfaces

interface ChartLegendContentProps {
  label: string;
  color: string;
  count: string;
}

import { Box, Typography } from "@anchor/react-components/dist/lib/components";
// styles
import {
  ArrowUpIcon,
  BulletPoint,
  ChartLabelNumber,
  ChartLegendContentWrapper,
} from "@styles/components/dashboard/chartLegendContent.styles";

const ChartLegendContent = ({ label, color, count }: ChartLegendContentProps) => {
  return (
    <ChartLegendContentWrapper display="flex" alignItems="center">
      <BulletPoint bg={color} />
      <Box display="flex">
        <Typography variant="body2" fontStyle="normal">
          {label}
        </Typography>
        <ChartLabelNumber variant="body2" fontStyle="normal">
          {count}
        </ChartLabelNumber>
        <ArrowUpIcon name="arrow-up" />
      </Box>
    </ChartLegendContentWrapper>
  );
};

export default ChartLegendContent;
