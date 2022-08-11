// next
import dynamic from "next/dynamic";

// dynamic static components
const FormModelerComp = dynamic(() => import("@/components/modeler/formModelerComp"), {
  ssr: false,
});

/**
 * @name ModelerPage
 * @description Method for generating the JSX for the ModelerPage route
 * @returns JSX for Next Page
 */
const ModelerPage = () => {
  // JSX for the modeler page
  return <FormModelerComp headerText="Form Builder" />;
};

ModelerPage.requireAuth = true;
export default ModelerPage;
