// next
import NextLink from "next/link";

// styles
import {
  ArrowRightIcon,
  DeployedSectionBodyContentDiv,
  DeployedSectionBodyCountSpan,
  DeployedSectionBodyLinkSpan,
  DeployedSectionHeader,
  DeployedSectionWrapper,
  DeployedSectionBody,
} from "@styles/components/dashboard/deployedSection.styles";
// constants
import {
  ProcessDefinitions,
  DecisionDefinitions,
  Deployments,
} from "src/configs/dashboard.constants";

import LoadingSpinner from "@/components/tasklist/loadingSpinner";
import { LoadingWrrapper } from "@styles/components/tasklist/diagramTab";

/**
 * @name DeployedSection
 * @description Method for generating the JSX for the DeployedSection component
 * @returns JSX for DeployedSection Component
 */

const DeployedSection = ({ isLoading, processCount, decisionCount, deploymentCount }) => {
  return (
    <DeployedSectionWrapper>
      <DeployedSectionHeader>Deployed</DeployedSectionHeader>
      {isLoading && (
        <LoadingWrrapper>
          <LoadingSpinner />
        </LoadingWrrapper>
      )}
      {!isLoading && (
        <>
          <DeployedSectionBody>
            <NextLink href="/process/process-definitions">
              <a>
                <DeployedSectionBodyContentDiv>
                  <DeployedSectionBodyCountSpan>{processCount}</DeployedSectionBodyCountSpan>
                  <DeployedSectionBodyLinkSpan>
                    <NextLink href="process/process-definitions">{ProcessDefinitions}</NextLink>
                  </DeployedSectionBodyLinkSpan>
                  <ArrowRightIcon name="arrow-right"></ArrowRightIcon>
                </DeployedSectionBodyContentDiv>
              </a>
            </NextLink>
          </DeployedSectionBody>

          <DeployedSectionBody>
            <NextLink href="/decision/decision-definitions">
              <a>
                <DeployedSectionBodyContentDiv>
                  <DeployedSectionBodyCountSpan>{decisionCount}</DeployedSectionBodyCountSpan>
                  <DeployedSectionBodyLinkSpan>
                    <a>{DecisionDefinitions}</a>
                  </DeployedSectionBodyLinkSpan>
                  <ArrowRightIcon name="arrow-right" />
                </DeployedSectionBodyContentDiv>
              </a>
            </NextLink>
          </DeployedSectionBody>
          <DeployedSectionBody>
            <NextLink href="/process/deployments">
              <a>
                <DeployedSectionBodyContentDiv>
                  <DeployedSectionBodyCountSpan>{deploymentCount}</DeployedSectionBodyCountSpan>
                  <DeployedSectionBodyLinkSpan>{Deployments}</DeployedSectionBodyLinkSpan>
                  <ArrowRightIcon name="arrow-right"></ArrowRightIcon>
                </DeployedSectionBodyContentDiv>
              </a>
            </NextLink>
          </DeployedSectionBody>
        </>
      )}
    </DeployedSectionWrapper>
  );
};

export default DeployedSection;
