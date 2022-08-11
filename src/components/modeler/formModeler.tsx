// react
import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";

// components
import { Box, Button, Input, toastEmitter } from "@anchor/react-components";

// form Modeler
import { FormEditor } from "@bpmn-io/form-js";
import { Schema } from "@bpmn-io/form-js-editor/dist/types/FormEditor";

// form styles
import "@bpmn-io/form-js/dist/assets/dragula.css";
import "@bpmn-io/form-js/dist/assets/form-js-editor.css";
import "@bpmn-io/form-js/dist/assets/form-js.css";

// styles
import {
  FormBuilderContainer,
  FormModeler,
  FormModelerButtons,
  FormModelerModal,
  RightButtons,
} from "src/styles/components/modeler/formModeler.styles";
import {
  useDeleteFormSchemaMutation,
  useSaveFormSchemaMutation,
  useUpdateFormSchemaMutation,
} from "src/redux/services/formApi";

export interface FormAttachmentDetailsType {
  attachmentId: string;
  name?: string;
  description?: string;
  version?: string;
}

const useFormBuilder = (containerId: string, schema?: Schema) => {
  const [isLoading, setIsLoading] = useState(true);
  const [noOfComponents, setNoOfComponents] = useState(0);
  const formModeler = useRef<FormEditor>();
  useEffect(() => {
    setIsLoading(true);
    if (!formModeler.current) {
      formModeler.current = new FormEditor({
        container: document.querySelector(`#${containerId}`),
      });
      formModeler.current.on("changed", 1, handleChange);
    }

    return () => {
      formModeler.current?.off("changed", handleChange);
      formModeler.current?.destroy();
      formModeler.current = undefined;
    };
  }, [containerId]);

  useEffect(() => {
    if (formModeler.current) importSchema(schema);
    setIsLoading(false);
  }, [schema.id]);

  const handleChange = ({ schema }) => {
    setNoOfComponents(schema?.components?.length);
  };

  const importSchema = (schema?: Schema) => {
    if (formModeler.current) {
      const prevSchema = formModeler.current.getSchema();
      const schemaValue = schema;
      if (!prevSchema?.id) formModeler.current?.importSchema(schemaValue);
    }
  };

  const saveSchema = () => {
    if (formModeler.current) {
      return formModeler.current.saveSchema();
    }
  };

  const resetForm: Schema = () => {
    formModeler.current?.clear();
    formModeler.current?.importSchema(schema);
  };

  //const isLoading = formModeler.current ? false : true;

  return { importSchema, noOfComponents, saveSchema, resetForm, isLoading };
};

/**
 * @name FormModelerPage
 * @description Method for generating the JSX for the FormModelerPage
 * @returns JSX
 */
const FormModelerPage = ({
  isEditMode,
  formAttachmentDetails,
  schema,
}: {
  isEditMode: boolean;
  formAttachmentDetails?: FormAttachmentDetailsType;
  schema: any;
}) => {
  const router = useRouter();
  const [postFormSchemaData] = useSaveFormSchemaMutation();
  const [updateFormSchemaData] = useUpdateFormSchemaMutation();
  const [deleteFormSchemaData] = useDeleteFormSchemaMutation();
  const [modalOpen, setModalOpen] = useState(false);
  const [schemaData, setSchemaData] = useState<any>({
    ...(isEditMode && formAttachmentDetails ? formAttachmentDetails : {}),
    attachmentType: "Form",
    schema: schema,
  });

  const { noOfComponents, isLoading, saveSchema, resetForm } = useFormBuilder(
    "form-editor",
    schema
  );

  // Disabled Form-js formId in edit mode
  useEffect(() => {
    if (isEditMode && !isLoading) {
      setTimeout(() => {
        const formIdInputEl = document.getElementById(
          "fjs-properties-panel-id"
        ) as HTMLInputElement;
        if (formIdInputEl) {
          formIdInputEl.disabled = true;
          formIdInputEl.style.cursor = "not-allowed";
        }
      }, 0);
    }
  }, [isEditMode, isLoading]);

  const btnText = isEditMode ? "Update" : "Create";
  const disableBtn = isLoading || noOfComponents === 0;

  const handleSaveClick = () => {
    const schema = saveSchema();
    setSchemaData((prevState) => ({ ...prevState, schema }));
    setModalOpen(true);
  };

  const handleDeploy = async () => {
    try {
      const version = schemaData.version ? +schemaData.version + 1 : 1;
      const { name, description, schema, attachmentId } = schemaData;
      let data = new FormData();
      if (!isEditMode) {
        data.append("name", name);
        data.append("attachmentType", "Form");
      }
      data.append("description", description);
      data.append("version", version.toString());
      data.append("data", JSON.stringify(schema));

      if (isEditMode) {
        const response = await updateFormSchemaData({
          attachmentId: attachmentId,
          data: data,
        }).unwrap();
        router.push(
          {
            pathname: "/forms/details",
            query: {
              attachmentId: response.attachmentId,
              name: response.name,
              description: response.description,
              version: response.version,
            },
          },
          undefined,
          { shallow: true }
        );
      } else {
        await postFormSchemaData(data).unwrap();
        clearForm();
      }
      toastEmitter(
        { title: `Successfully ${isEditMode ? "updated" : "saved"} form - ${schemaData.name}` },
        {
          type: "success",
          position: "bottom-right",
          toastId: "formBuilder-success",
        }
      );
    } catch (err) {
      toastEmitter(
        {
          title: `Failed to ${
            isEditMode ? "update" : "save"
          } the form data, Please try again later.`,
        },
        {
          type: "error",
          position: "bottom-right",
          toastId: "formBuilder",
        }
      );
      console.error(err);
    } finally {
      setModalOpen(false);
    }
  };

  const handleFormChange = (key, value) => {
    setSchemaData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const clearForm = () => {
    setSchemaData({
      ...(isEditMode && formAttachmentDetails ? formAttachmentDetails : {}),
      attachmentType: "Form",
      schema: schema,
    });
    resetForm();
  };

  const deleteForm = async () => {
    if (isEditMode) {
      try {
        const { attachmentId, name } = schemaData;
        await deleteFormSchemaData(attachmentId).unwrap();
        toastEmitter(
          { title: `Successfully delete form - ${name}` },
          {
            type: "success",
            position: "bottom-right",
            toastId: "formBuilder-del-success",
          }
        );
        router.push("/forms");
      } catch (err) {
        toastEmitter(
          { title: `Failed to delete form - ${name}, Please try again later.` },
          {
            type: "error",
            position: "bottom-right",
            toastId: "formBuilder-del-failed",
          }
        );
      }
    }
  };

  return (
    <FormModeler>
      <FormBuilderContainer>
        <div id="form-editor" />
      </FormBuilderContainer>
      <FormModelerButtons>
        <Box>
          {isEditMode && (
            <Button
              variant="plain"
              disabled={isLoading}
              label="Delete"
              icon="trash"
              iconPosition="left"
              onClick={deleteForm}
            />
          )}
        </Box>
        <RightButtons>
          <Button variant="outlined" disabled={disableBtn} label="Reset" onClick={clearForm} />
          <Button
            variant="filled"
            disabled={disableBtn}
            label={btnText}
            onClick={handleSaveClick}
          />
        </RightButtons>
      </FormModelerButtons>

      <FormModelerModal
        zindex="99999"
        heading={`${isEditMode ? "Update" : "Create"} form`}
        showCloseIcon={true}
        size="medium"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        actions={{
          primaryAction: (
            <Button
              label="Save"
              disabled={!schemaData?.name || !schemaData?.description}
              onClick={() => handleDeploy()}
            />
          ),
          secondaryAction: (
            <Button variant="outlined" label="Cancel" onClick={() => setModalOpen(false)} />
          ),
        }}
      >
        {modalOpen && (
          <Box>
            <Box mb={16}>
              <Input
                label="Name"
                id="form-name"
                placeholder="Enter the form name"
                required={true}
                fit="medium"
                variant="default"
                errorMessage="Name is required"
                disabled={isEditMode}
                error={!schemaData?.name?.length}
                value={schemaData?.name || ""}
                onChange={({ target: { value } }) => handleFormChange("name", value)}
              />
            </Box>
            <Box mb={16}>
              <Input
                label="Description"
                id="form-description"
                placeholder="Enter the description"
                required={true}
                fit="medium"
                variant="default"
                error={!schemaData?.description?.length}
                errorMessage="Description is required"
                value={schemaData?.description || ""}
                onChange={({ target: { value } }) => handleFormChange("description", value)}
              />
            </Box>
          </Box>
        )}
      </FormModelerModal>
    </FormModeler>
  );
};

export default FormModelerPage;
