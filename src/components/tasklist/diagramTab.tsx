import dynamic from "next/dynamic";
import { Box } from "@anchor/react-components";
import LoadingSpinner from "./loadingSpinner";
import { LoadingWrrapper } from "@styles/components/tasklist/diagramTab";
import { useGetBpnmDiagramXMLQuery } from "src/redux/services/taskDiagramBpnmApi";
import InfoBox from "./infoBox";

// dynamic static components
const DiagramBPMNPreview = dynamic(() => import("./diagramBPMNPreview"), { ssr: false });

const DiagramTab = ({
  sidebarIsExpanded,
  processDefinitionId,
}: {
  sidebarIsExpanded: boolean;
  processDefinitionId: string;
}) => {
  const {
    data: diagramData,
    isLoading,
    isError,
    error,
  } = useGetBpnmDiagramXMLQuery(processDefinitionId, {
    skip: !processDefinitionId,
  });
  if (isLoading) {
    return (
      <LoadingWrrapper>
        <LoadingSpinner />
      </LoadingWrrapper>
    );
  }
  if (!processDefinitionId || (!isLoading && !diagramData?.bpmn20Xml)) {
    return (
      <Box py={16}>
        <InfoBox text="Note there is no diagram available." type="info" />
      </Box>
    );
  }

  if (isError) {
    const errorText = "Something went wrong!";
    return (
      <Box py={16}>
        <InfoBox text={errorText} type="error" />
      </Box>
    );
  }
  return (
    !isLoading &&
    diagramData && (
      <DiagramBPMNPreview
        sidebarIsExpanded={sidebarIsExpanded}
        id={diagramData?.id}
        xml={diagramData?.bpmn20Xml}
      />
    )
  );
};

export default DiagramTab;
