// next
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// dynamic static components
const DynamicDpnModelerComponent = dynamic(() => import("../../../components/modeler/dmnModeler"), {
  ssr: false,
});

// styles
import { ModelerRoute, ModelerRouteHeader } from "src/styles/pages/create-workflow.styles";

/**
 * @name ModelerPage
 * @description Method for generating the JSX for the ModelerPage route
 * @returns JSX for Next Page
 */
const ModelerPage = ({ sidebarIsExpanded }: { sidebarIsExpanded: boolean }) => {
  const router = useRouter();
  const { deploymentId } = router.query;

  // JSX for the modeler page
  return (
    <ModelerRoute sidebarIsExpanded={sidebarIsExpanded}>
      <ModelerRouteHeader variant="h3" fontStyle="normal">
        DMN diagram
      </ModelerRouteHeader>
      <DynamicDpnModelerComponent deploymentId={deploymentId === "initial" ? "" : deploymentId} />
    </ModelerRoute>
  );
};

ModelerPage.requireAuth = true;
export default ModelerPage;
