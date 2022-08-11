// BPMN Modeler
import Modeler from "bpmn-js/lib/Modeler.js";
import propertiesPanelModule from "bpmn-js-properties-panel";
import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";
import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda.json";

// utils
import { saveState, saveXml } from "src/utils/utils";

// interfaces
interface responseType {
  xml: XMLDocument;
}

/**
 * @name BpmnRenderModelerClass
 * @description class that loads the modeler and can save the diagrams
 * @returns none
 */
export class BpmnRenderModelerClass {
  modeler: any;

  constructor(diagram: string) {
    if (diagram.length) {
      this.modeler = new Modeler({
        keyboard: {
          bindTo: document,
        },
        additionalModules: [propertiesPanelModule, propertiesProviderModule],
        container: "#modeler__bpmn__canvas",
        propertiesPanel: {
          parent: "#modeler__bpmn__properties",
        },
        // make camunda prefix known for import, editing and export
        moddleExtensions: {
          camunda: camundaModdleDescriptor,
        },
      });

      // load a BPMN 2.0 diagram
      const loadModeler = async () => {
        try {
          await this.modeler.importXML(diagram).then(({ warnings }: { warnings: any }) => {
            if (warnings.length) {
              console.warn("Warnings", warnings);
            }
            // set custom colors based on the id of the xml tags
            const modeling = this.modeler.get("modeling");
            const elementRegistry = this.modeler.get("elementRegistry");

            let elementToColor = elementRegistry.get("dayType_id");
            if (elementToColor) {
              modeling.setColor([elementToColor], {
                stroke: "green",
                fill: "yellow",
              });
            }
          });
          this.modeler.get("canvas").zoom("fit-viewport");
        } catch (err) {
          console.error("error", err);
        }
      };
      loadModeler();
    }
  }

  download(): void {
    try {
      this.modeler.saveXML({ format: true }).then((response: responseType) => {
        saveState(response.xml, "bpmn-xml");
        saveXml(response.xml, "Bpmn.bpmn");
      });
    } catch (error) {
      console.error("error", error);
    }
  }

  save(): XMLDocument | undefined {
    try {
      return this.modeler.saveXML({ format: true }).then((response: responseType) => {
        saveState(response.xml, "bpmn-xml");
        return response.xml;
      });
    } catch (error) {
      console.error("error", error);
    }
  }
}
