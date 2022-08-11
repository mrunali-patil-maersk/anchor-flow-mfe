// DMN Modeler
import DmnModeler from "dmn-js/lib/Modeler";
import propertiesPanelModule from "dmn-js-properties-panel";
import drdAdapterModule from "dmn-js-properties-panel/lib/adapter/drd";
import propertiesProviderModule from "dmn-js-properties-panel/lib/provider/camunda";
import camundaModdleDescriptor from "camunda-dmn-moddle/resources/camunda.json";

// utils
import { saveState, saveXml } from "src/utils/utils";

// interfaces
interface responseType {
  xml: XMLDocument;
}

/**
 * @name DmnRenderModelerClass
 * @description class that loads the modeler and can save the diagrams
 * @returns none
 */
export class DmnRenderModelerClass {
  modeler: any;

  constructor(diagram: string) {
    if (diagram.length) {
      this.modeler = new DmnModeler({
        keyboard: {
          bindTo: document,
        },
        drd: {
          propertiesPanel: {
            parent: "#modeler__dmn__properties",
          },
          additionalModules: [propertiesPanelModule, propertiesProviderModule, drdAdapterModule],
        },
        container: "#modeler__dmn__canvas",
        // make camunda prefix known for import, editing and export
        moddleExtensions: {
          camunda: camundaModdleDescriptor,
        },
      });

      // load a DMN diagram
      const loadModeler = async () => {
        try {
          await this.modeler.importXML(diagram).then(({ warnings }: { warnings: any }) => {
            if (warnings.length) {
              console.warn("Warnings", warnings);
            }
            // access active editor components
            const activeEditor = this.modeler.getActiveViewer();

            // access active editor components
            const canvas = activeEditor.get("canvas");

            // zoom to fit full viewport
            canvas.zoom("fit-viewport");
          });
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
        saveState(response.xml, "dmn-xml");
        saveXml(response.xml, "DMN.xml");
      });
    } catch (error) {
      console.error("error", error);
    }
  }

  save(): XMLDocument | undefined {
    try {
      return this.modeler.saveXML({ format: true }).then((response: responseType) => {
        saveState(response.xml, "dmn-xml");
        return response.xml;
      });
    } catch (error) {
      console.error("error", error);
    }
  }
}
