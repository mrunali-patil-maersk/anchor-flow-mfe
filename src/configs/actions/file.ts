import { bpmnDeploymentUrl } from "@/configs/apis/apiEndPoints";

export const postBpmnDeployments = ({ file, tenantId, deploymentName }: any) => {
  console.log("bpmnDeploymentUrl", bpmnDeploymentUrl);

  let formData = new FormData();

  if (tenantId.length) {
    formData.append("tenant-id", tenantId);
  }

  if (deploymentName.length) {
    formData.append("deployment-name", deploymentName);
    formData.append("deployment-source", "Anchor Flow");
  }

  if (file) {
    // parsing the xml documents to get the file name and using that below
    const parser = new DOMParser();
    const fileName = parser
      .parseFromString(file, "text/xml")
      .getElementsByTagName("bpmn:process")[0]["id"];

    // creating blob from the xml contents and appending it to formData
    const blob = new Blob([file], { type: "text/xml" });
    formData.append("wf", blob, `${fileName}.bpmn`);
  }

  return {
    method: "post",
    url: bpmnDeploymentUrl,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
};
