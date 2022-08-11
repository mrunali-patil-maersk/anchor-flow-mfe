// interfaces
interface ActiveTabConfigType {
  id: string;
  label: string;
  active: boolean;
}
interface MetricsHeaderSectionProps {
  activeTabConfig: ActiveTabConfigType[];
  tabClickHandler: (selectedTab: ActiveTabConfigType) => void;
}

// styles
import {
  MetricsHeaderSectionHeadingH3,
  MetricsHeaderSectionTabButton,
  MetricsHeaderSectionTabsDiv,
  MetricsHeaderSectionWrapper,
} from "@styles/components/dashboard/metricsHeaderSection.styles";

/**
 * @name MetricsHeaderSection
 * @description Method for generating the JSX for the MetricsHeaderSection component
 * @returns JSX for MetricsHeaderSection component
 */
const MetricsHeaderSection = ({ activeTabConfig, tabClickHandler }: MetricsHeaderSectionProps) => {
  return (
    <MetricsHeaderSectionWrapper>
      <MetricsHeaderSectionHeadingH3>Metrics</MetricsHeaderSectionHeadingH3>
      <MetricsHeaderSectionTabsDiv>
        {activeTabConfig?.map((item) => (
          <MetricsHeaderSectionTabButton
            key={item.id}
            label={item.label}
            variant="plain"
            active={item.active}
            onClick={() => {
              tabClickHandler(item);
            }}
          />
        ))}
      </MetricsHeaderSectionTabsDiv>
    </MetricsHeaderSectionWrapper>
  );
};

export default MetricsHeaderSection;
