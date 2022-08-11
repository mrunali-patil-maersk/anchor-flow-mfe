// next
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// dynamic static components
const DynamicBpmnModelerComponent = dynamic(
  () => import("../../../components/modeler/bpmnModeler"),
  {
    ssr: false,
  }
);

// styles
import { ModelerRoute, ModelerRouteHeader } from "src/styles/pages/create-workflow.styles";

/**
 * @name ModelerPage
 * @description Method for generating the JSX for the ModelerPage route
 * @returns JSX for Next Page
 */
const ModelerPage = ({ sidebarIsExpanded }: { sidebarIsExpanded: boolean }) => {
  const router = useRouter();
  const { deploymentId, resourceId } = router.query;

  // JSX for the modeler page
  return (
    <ModelerRoute sidebarIsExpanded={sidebarIsExpanded}>
      <ModelerRouteHeader variant="h3" fontStyle="normal">
        BPMN diagram
      </ModelerRouteHeader>
      <DynamicBpmnModelerComponent deploymentId={deploymentId} deploymentResourceId={resourceId} />
    </ModelerRoute>
  );
};

ModelerPage.requireAuth = true;
export default ModelerPage;
