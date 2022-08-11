export const tabItemsConfig = [
  {
    id: "bpmn",
    title: "BPMN Diagram",
    active: true,
  },
  {
    id: "dmn",
    title: "DMN Diagram",
    active: false,
  },
  {
    id: "form",
    title: "Form",
    active: false,
  },
];

export const formModelerSchema = {
  components: [
    {
      key: "creditor",
      label: "Creditor",
      type: "textfield",
      validate: {
        required: true,
      },
    },
    {
      key: "amount",
      label: "Amount",
      type: "number",
      validate: {
        required: true,
      },
    },
    {
      description: "An invoice number in the format: C-123.",
      key: "invoiceNumber",
      label: "Invoice Number",
      type: "textfield",
      validate: {
        pattern: "^C-[0-9]+$",
      },
    },
    {
      key: "approved",
      label: "Approved",
      type: "checkbox",
    },
    {
      key: "approvedBy",
      label: "Approved By",
      type: "textfield",
    },
    {
      key: "submit",
      label: "Submit",
      type: "button",
    },
    {
      action: "reset",
      key: "reset",
      label: "Reset",
      type: "button",
    },
  ],
  type: "default",
};

export const initialBpmnDiagram = (id: number) => `
  <?xml version="1.0" encoding="UTF-8"?>
  <bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
  xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" 
  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" 
  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" 
  targetNamespace="http://bpmn.io/schema/bpmn" 
  id="Definitions_1">
  <bpmn:process id="Process_id_${id}" name="Process_name_${id}" isExecutable="true">
  <bpmn:startEvent id="StartEvent_1"/>
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
  <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_id_${id}">
  <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
  <dc:Bounds height="36" width="36" x="173" y="102"/>
  </bpmndi:BPMNShape>
  </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
  </bpmn:definitions>`;

export const initialDmnDiagram = (id: number) => `
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="https://www.omg.org/spec/DMN/20191111/MODEL/" xmlns:dmndi="https://www.omg.org/spec/DMN/20191111/DMNDI/" xmlns:dc="http://www.omg.org/spec/DMN/20180521/DC/" id="Decision_id_${id}" name="Decision_name_${id}" namespace="http://camunda.org/schema/1.0/dmn">
</definitions>
`;
