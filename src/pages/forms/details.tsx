import { Box } from "@anchor/react-components";
import LoadingSpinner from "@/components/tasklist/loadingSpinner";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useGetFormSchemaQuery } from "src/redux/services/formApi";

// dynamic static components
const FormModelerComp = dynamic(() => import("@/components/modeler/formModelerComp"), {
  ssr: false,
});

const FormsDetailsPage = () => {
  const { query } = useRouter();
  const attachmentId = query?.attachmentId as string;
  const { data, isLoading } = useGetFormSchemaQuery(attachmentId);
  const version = query?.version as string;
  const name = query?.name as string;
  const description = query?.description as string;
  const formAttachmentDetails = {
    attachmentId,
    name,
    description,
    version,
  };
  if (isLoading) {
    return (
      <Box height="70vh">
        <LoadingSpinner />
      </Box>
    );
  }
  if (data && attachmentId) {
    return (
      <FormModelerComp
        headerText={`${name} - Edit mode`}
        formAttachmentDetails={formAttachmentDetails}
        schema={
          data && data.type && data.schemaVersion
            ? { ...data, schemaVersion: +version + 1 }
            : { type: "default", schemaVersion: 1 }
        }
        isEditMode={true}
      />
    );
  }
  return null;
};

FormsDetailsPage.requireAuth = true;

export default FormsDetailsPage;
