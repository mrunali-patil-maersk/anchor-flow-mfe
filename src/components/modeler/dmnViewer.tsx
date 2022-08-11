// react
import React, { useEffect, useState } from "react";

// configs
import { DmnModdleViewer } from "./dmnModdleViewer";

// bpmn styles
import "dmn-js/dist/assets/diagram-js.css";
import "dmn-js/dist/assets/dmn-js-decision-table-controls.css";
import "dmn-js/dist/assets/dmn-js-decision-table.css";
import "dmn-js/dist/assets/dmn-js-drd.css";
import "dmn-js/dist/assets/dmn-js-literal-expression.css";
import "dmn-js/dist/assets/dmn-js-shared.css";
import "dmn-js/dist/assets/dmn-font/css/dmn.css";
import "dmn-js/dist/assets/dmn-font/css/dmn-codes.css";
import "dmn-js/dist/assets/dmn-font/css/dmn-embedded.css";

// styles
import {
  DmnModelerSection,
  DmnModelerSectionContainer,
  DmnModelerSectionContainerCanvas,
} from "src/styles/components/modeler/dmnViewer.styles";

/**
 * @name DmnModelerPage
 * @description Method for generating the JSX for the DmnModelerPage
 * @returns JSX
 */
const DmnModelerPage = ({
  diagram,
  sidebarIsExpanded,
}: {
  diagram: string;
  sidebarIsExpanded: boolean;
}) => {
  const [dmnViewer, setDmnViewer] = useState<any>({});

  // used to render the updated diagram
  useEffect(() => {
    setDmnViewer(new DmnModdleViewer(diagram));
  }, [diagram]);

  return (
    <DmnModelerSection>
      <DmnModelerSectionContainer>
        <DmnModelerSectionContainerCanvas
          sidebarIsExpanded={sidebarIsExpanded}
          id="modeler__dmn__viewer"
        ></DmnModelerSectionContainerCanvas>
      </DmnModelerSectionContainer>
    </DmnModelerSection>
  );
};

export default DmnModelerPage;
