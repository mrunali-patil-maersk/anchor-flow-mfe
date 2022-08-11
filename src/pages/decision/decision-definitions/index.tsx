// styles
import { DecisionDefinitions } from "@styles/pages/process/decision-definitions.styles";

// components
import DecisionsList from "@/components/decisionsList/decisionsList";

const DecisionDefinition = ({ sidebarIsExpanded }: { sidebarIsExpanded: boolean }) => {
  return (
    <DecisionDefinitions sidebarIsExpanded={sidebarIsExpanded}>
      <DecisionsList />
    </DecisionDefinitions>
  );
};

// Protected routes
DecisionDefinition.requireAuth = true;
export default DecisionDefinition;
