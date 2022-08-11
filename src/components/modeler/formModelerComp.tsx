import { FormAttachmentDetailsType } from "@/components/modeler/formModeler";
import { Tooltip } from "@anchor/react-components/dist/lib/components";
import { MainHeading } from "@styles/components/decisionsList/decisionsList.style";
import { FormContainer, FormHeader, FormRoute } from "@styles/pages/process/forms.style";
import dynamic from "next/dynamic";

// dynamic static components
const DynamicFormModelerComponent = dynamic(() => import("@/components/modeler/formModeler"), {
  ssr: false,
});

const FormModelerComp = ({
  headerText,
  isEditMode = false,
  schema = { type: "default", schemaVersion: 1 },
  formAttachmentDetails,
}: {
  headerText: string;
  isEditMode?: boolean;
  formAttachmentDetails?: FormAttachmentDetailsType;
  schema?: any;
}) => {
  return (
    <FormRoute>
      <FormContainer>
        <FormHeader>
          <Tooltip content={headerText} disabled={!isEditMode}>
            <MainHeading variant="h3" fontStyle="normal">
              {headerText}
            </MainHeading>
          </Tooltip>
        </FormHeader>
        <DynamicFormModelerComponent
          isEditMode={isEditMode}
          formAttachmentDetails={formAttachmentDetails}
          schema={schema}
        />
      </FormContainer>
    </FormRoute>
  );
};

export default FormModelerComp;
