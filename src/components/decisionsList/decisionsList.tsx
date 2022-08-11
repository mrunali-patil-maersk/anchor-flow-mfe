import React, { useState, useEffect } from "react";
import LoadingSpinner from "@/components/tasklist/loadingSpinner";

// styles
import {
  DecisionsListWrapper,
  StyledHeaderTxt,
  DecisionsListContainer,
  MainHeading,
} from "@styles/components/decisionsList/decisionsList.style";
import { ProcessDefinitionSubPageSearchTextContainer } from "@styles/pages/process/process-definitions.styles";

//constants
import {
  decisionsListColumnData,
  decisionsDefinitionDraftColumnData,
  decisionsListPrimaryKey,
  decisionsDefinitionTabItemsConfig,
} from "src/configs/decisions_definitions.constants";
import {
  DecisionDefinitionListUrl,
  DecisionDefinitionCountUrl,
  apiGateway,
} from "@/configs/apis/apiEndPoints";

//components
import { Button, Tabs, Input } from "@anchor/react-components";
import NextLink from "next/link";

// interfaces
interface ItemType {
  id: string;
  title: string;
  active: boolean;
}

interface TabItemProps {
  selectedItemId: string;
  updatedTabData: Array<ItemType>;
}
import useDebounce from "@hooks/useDebounce";

// configs
import { getListAndCountConfig } from "@/configs/actions/decisions-definitions";
import { callApi } from "@/configs/apis/axiosAPI";

// components
import ListView from "@/components/listView/listView";

//styles
import { LoadingWrrapper } from "@styles/components/tasklist/diagramTab";

/**
 * @name DecisionsList
 * @description Method for generating the JSX for the DecisionsList.
 * @returns JSX
 */
const DecisionsList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [decisionDefinitionSearchText, setDecisionDefinitionSearchText] = useState<string>("");
  const [DecisionsListData, setDecisionsListData] = useState<Array<any>>([]);
  const [tabItems, setTabItems] = useState<Array<ItemType>>(decisionsDefinitionTabItemsConfig);
  const [activeTab, setActiveTab] = useState<string>("Deployed");
  const [maxCount, setMaxCount] = useState<number>(0);
  const debouncedSearchTerm: string = useDebounce<string>(decisionDefinitionSearchText, 500);
  // states for pagination
  const [pageNumber, setPageNumber] = useState<number>(1);

  /**
   * @name getdecisionsdefintionsLists
   * @description Method for fetching the decisions-defintions list data using API and updates the state
   * @param none
   * @returns none
   */
  const getDecisionsDefintionsLists = async (firstResult = 0, nameFilter = "") => {
    try {
      setIsLoading(true);
      const config: any = getListAndCountConfig(DecisionDefinitionListUrl, firstResult, 10);
      const countConfig: any = getListAndCountConfig(DecisionDefinitionCountUrl, firstResult, 10);
      const { count } = await callApi(apiGateway + DecisionDefinitionCountUrl, countConfig);
      const response = await callApi(apiGateway + DecisionDefinitionListUrl, config);
      setDecisionsListData(
        response.map((item) => {
          return {
            id: item.id,
            state: "Success",
            name: item.name,
            versions: "V" + item.version,
            tenant_id: item.tenantId,
          };
        })
      );
      setMaxCount(count);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  /**
   * @name handleClick
   * @description Method for updating the state after the tab clicks
   * @param value
   */
  const handleClick = ({ selectedItemId, updatedTabData }: TabItemProps) => {
    setActiveTab(selectedItemId);
    setTabItems(updatedTabData);
  };

  // Method for updating the page number
  // Method for updating the name filter
  const handleTextInputChange = (value) => {
    setPageNumber(1);
    setDecisionDefinitionSearchText(value);
  };
  // triggers the getProcessList method
  useEffect(() => {
    if (debouncedSearchTerm) {
      getDecisionsDefintionsLists((pageNumber - 1) * 10, debouncedSearchTerm);
    } else {
      getDecisionsDefintionsLists((pageNumber - 1) * 10);
    }
  }, [debouncedSearchTerm, pageNumber]);
  // returns the Decisions Definition list view  based on the type
  const renderDecisionsDefinationChildrenContent = () => {
    switch (activeTab) {
      default:
        return (
          <>
            {isLoading && (
              <LoadingWrrapper>
                <LoadingSpinner />
              </LoadingWrrapper>
            )}
            {!isLoading && (
              <>
                <ListView
                  rowData={DecisionsListData}
                  columnData={decisionsListColumnData}
                  primaryKey={decisionsListPrimaryKey}
                  searchBarVisibile={false}
                  placeHolder="Search Decision"
                />
              </>
            )}
          </>
        );
      case "Deployed":
        return (
          <>
            {isLoading && (
              <LoadingWrrapper>
                <LoadingSpinner />
              </LoadingWrrapper>
            )}
            {!isLoading && (
              <>
                <ListView
                  rowData={DecisionsListData}
                  columnData={decisionsListColumnData}
                  primaryKey={decisionsListPrimaryKey}
                  searchBarVisibile={false}
                  placeHolder="Search Decision"
                />
              </>
            )}
          </>
        );
      case "Draft":
        return (
          <>
            {isLoading && (
              <LoadingWrrapper>
                <LoadingSpinner />
              </LoadingWrrapper>
            )}
            {!isLoading && (
              <>
                <ListView
                  rowData={DecisionsListData}
                  columnData={decisionsDefinitionDraftColumnData}
                  primaryKey={decisionsListPrimaryKey}
                  searchBarVisibile={false}
                  placeHolder="Search Decision"
                />
              </>
            )}
          </>
        );
    }
  };
  return (
    <DecisionsListWrapper bg="functional.grey.100">
      <StyledHeaderTxt>
        <MainHeading fontStyle="normal" variant="h3">
          {`${maxCount} decision${maxCount < 2 ? "" : "s"} deployed`}
        </MainHeading>

        <NextLink href="/create-workflow/dmn/default">
          <a>
            <Button variant="filled" icon="clipboard-check" label="Create new decision" />
          </a>
        </NextLink>
      </StyledHeaderTxt>
      <DecisionsListContainer>
        <>
          <Tabs
            items={tabItems}
            type="default"
            onClick={(value: TabItemProps) => handleClick(value)}
          />
          <ProcessDefinitionSubPageSearchTextContainer>
            <Input
              clearButton
              id="decisions_definitions_search"
              placeholder="Search Decision"
              variant="default"
              icon="magnifying-glass"
              iconPosition="left"
              value={decisionDefinitionSearchText}
              onChange={({ target: { value } }) => handleTextInputChange(value)}
              onClear={() => handleTextInputChange("")}
            />
          </ProcessDefinitionSubPageSearchTextContainer>
          <> {renderDecisionsDefinationChildrenContent()}</>
        </>
      </DecisionsListContainer>
    </DecisionsListWrapper>
  );
};

export default DecisionsList;
