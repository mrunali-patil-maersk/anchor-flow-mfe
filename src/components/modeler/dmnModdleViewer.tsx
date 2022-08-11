// DMN Modeler
import DmnViewer from "dmn-js/lib/Viewer";

/**
 * @name renderModelerClass
 * @description class that loads the modeler and can save the diagrams
 * @returns none
 */
export class DmnModdleViewer {
  modeler: any;

  constructor(diagram: string) {
    if (diagram.length) {
      this.modeler = new DmnViewer({
        keyboard: {
          bindTo: document,
        },
        height: 300,
        container: "#modeler__dmn__viewer",
      });

      const loadModeler = async () => {
        try {
          await this.modeler.importXML(diagram).then(({ warnings }: { warnings: any }) => {
            if (warnings.length) {
              console.warn("Warnings", warnings);
            }
          });
        } catch (err) {
          console.error("error", err);
        }
      };
      loadModeler();
    }
  }
}
