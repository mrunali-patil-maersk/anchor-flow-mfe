import { useEffect, useRef } from "react";

// BPMN viewer
import Viewer from "bpmn-js/lib/NavigatedViewer.js";
import { Box } from "@anchor/react-components";

const CanvasHeight = 400;

/**
 * @name renderviewerClass
 * @description class that loads the viewer and can save the diagrams
 * @returns none
 */
class renderViewerClass {
  viewer: any;
  xml: XMLDocument | null;
  containerId: string;

  constructor(containerId: string) {
    this.viewer = {};
    this.xml = null;
    this.containerId = containerId;
  }

  load(xml?: XMLDocument): void {
    if (xml) {
      this.xml = xml;
      this.viewer = new Viewer({
        container: this.containerId,
        keyboard: {
          bindTo: document,
        },
        height: CanvasHeight,
      });
    }
    if (this.xml) {
      // load a BPMN 2.0 diagram
      const loadViewer = async () => {
        try {
          await this.viewer.importXML(this.xml);
          const canvas = this.viewer.get("canvas");
          canvas.zoom("fit-viewport", "auto");
        } catch (err) {
          console.error("error", err);
        }
      };
      loadViewer();
    }
  }
  refresh() {
    this.load();
  }
}

const DiagramBPMNPreview = ({
  id,
  xml,
  sidebarIsExpanded,
}: {
  id: string;
  xml: XMLDocument;
  sidebarIsExpanded: boolean;
}) => {
  const renderViewer = useRef(new renderViewerClass("#task_list_diagram"));

  useEffect(() => {
    renderViewer.current.load(xml);
  }, []);
  useEffect(() => {
    renderViewer.current.refresh();
  }, [sidebarIsExpanded]);

  return <Box key={id} id="task_list_diagram" height={CanvasHeight} mt={8} mx={24} />;
};

export default DiagramBPMNPreview;
