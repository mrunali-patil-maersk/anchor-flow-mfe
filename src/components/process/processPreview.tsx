// react
import React, { useEffect, useState } from "react";

// next
import { useRouter } from "next/router";

// styles
import { Icon } from "@anchor/react-components";

// BPMN viewer
import Viewer from "bpmn-js/lib/NavigatedViewer.js";

import {
  ProcessDefinitionPreviewWidget,
  ProcessDefinitionPreviewWidgetHeader,
  ProcessDefinitionPreviewWidgetImage,
  ProcessDefinitionPreviewWidgetFooter,
  ProcessDefinitionPreviewWidgetFooterIcon,
  WidgetImageLoader,
} from "../../styles/components/process/processPreview.styles";

// interfaces
interface ProcessPreviewProps {
  title?: string;
  xml?: string;
  instance?: string;
  uniqueId?: string;
  isDetailsPage?: boolean;
  state?: string;
  processId?: string;
}

/**
 * @name renderviewerClass
 * @description class that loads the viewer and can save the diagrams
 * @returns none
 */
class renderViewerClass {
  viewer: any;
  isDetailsPage: boolean;

  constructor() {
    this.viewer = {};
    this.isDetailsPage = false;
  }

  load(type: boolean, xml: string, uniqueId: string): void {
    this.isDetailsPage = type;
    if (xml) {
      this.viewer = new Viewer({
        container: `#viewer__bpmn__canvas__${uniqueId}`,
        height: this.isDetailsPage ? 300 : 164,
      });

      // load a BPMN 2.0 diagram
      const loadviewer = async () => {
        try {
          await this.viewer.importXML(xml);
          if (document.querySelectorAll("[id^=loader_]").length > 0) {
            document.querySelectorAll("[id^=loader_]").forEach((item) => item.remove());
          }
        } catch (err) {
          console.error("error", err);
        }
      };
      loadviewer();
    }
  }

  unmount(): void {
    try {
      this.viewer.destroy();
    } catch (error) {
      console.error("error", error);
    }
  }
}

const ProcessPreviewWidget = ({
  title,
  xml,
  instance = "0",
  uniqueId,
  isDetailsPage,
  state,
  processId,
}: ProcessPreviewProps) => {
  const [renderViewer] = useState<any>(new renderViewerClass());
  const router = useRouter();

  useEffect(() => {
    renderViewer.load(isDetailsPage, xml, uniqueId);
    // clean up of the renderViewer to flush the older diagrams on load
    return () => {
      renderViewer.unmount();
    };
  }, [xml]);

  const handleClick = (e) => {
    e.preventDefault();
    if (!isDetailsPage) {
      router.push(`/process/process-definitions/details?id=${processId}`);
    }
  };

  return (
    <ProcessDefinitionPreviewWidget isDetailsPage={isDetailsPage} onClick={handleClick}>
      {!isDetailsPage && (
        <ProcessDefinitionPreviewWidgetHeader hasBottomBorder={true}>
          {title}
        </ProcessDefinitionPreviewWidgetHeader>
      )}
      <ProcessDefinitionPreviewWidgetImage id={`viewer__bpmn__canvas__${uniqueId}`}>
        <WidgetImageLoader id={`loader_${uniqueId}`}>Loading...</WidgetImageLoader>
      </ProcessDefinitionPreviewWidgetImage>
      {!isDetailsPage && (
        <ProcessDefinitionPreviewWidgetFooter variant="body1" div={true} hasBottomBorder={false}>
          <ProcessDefinitionPreviewWidgetFooterIcon state={state}>
            <Icon
              name={
                state === "Failed"
                  ? "times-circle"
                  : state === "In progress"
                  ? "exclamation-circle"
                  : "check-circle"
              }
            />
            &nbsp;{state}
          </ProcessDefinitionPreviewWidgetFooterIcon>
          <section>
            {instance === "0" ? "No running instance" : `${instance} Running Instance`}
          </section>
        </ProcessDefinitionPreviewWidgetFooter>
      )}
    </ProcessDefinitionPreviewWidget>
  );
};

export default ProcessPreviewWidget;
