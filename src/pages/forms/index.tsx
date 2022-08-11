import { ChangeEvent, useState } from "react";
import NextLink from "next/link";
import { Box, Button, Input, Table } from "@anchor/react-components";
import { MainHeading } from "@styles/components/decisionsList/decisionsList.style";
import {
  FormsListPage,
  FormsListWrapper,
  PaginationWrapper,
  TableWrapper,
} from "@styles/pages/process/forms.style";
import { FormListColumnData, formListPrimaryKey } from "@/configs/forms.constant";
import Pagination from "@/components/tasklist/pagination";
import { useGetFormsListQuery } from "src/redux/services/formApi";
import LoadingSpinner from "@/components/tasklist/loadingSpinner";
import InfoBox from "@/components/tasklist/infoBox";
import { getLongformattedDateTime } from "src/utils/dateTimeUtils";
import useDebounce from "@hooks/useDebounce";

const PAGE_SIZE = 15;

const FormsPage = () => {
  const [search, setSearch] = useState("");
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search form list
  const debouncedFormSearchValue: string = useDebounce<string>(search, 500);

  // API get list of form
  const {
    data: { data, totalItems } = { data: [] },
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetFormsListQuery({
    pageNumber: currentPage - 1,
    pageSize: PAGE_SIZE,
    name: debouncedFormSearchValue,
  });

  const handleOnChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setSearch(e.target.value);
  };
  const handleResetSearch = () => {
    setSearch("");
  };

  const handleOnPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formListRowData = data?.map(({ attachmentId, createdDate, lastModifiedDate, ...rest }) => ({
    id: attachmentId,
    createdDate: createdDate ? getLongformattedDateTime(createdDate) : "-",
    lastModifiedDate: lastModifiedDate ? getLongformattedDateTime(lastModifiedDate) : "-",
    ...rest,
  }));

  const errorText = isError ? (error as any)?.data?.error || "Something went wrong!" : "";
  const isFormListLoading = isLoading || isFetching;
  return (
    <FormsListPage>
      <Box display="flex" justifyContent="space-between">
        <MainHeading fontStyle="normal" variant="h3">
          Form List
        </MainHeading>
        <NextLink href="/create-workflow/form">
          <a>
            <Button variant="filled" icon="clipboard-check" label="Create form" />
          </a>
        </NextLink>
      </Box>
      <FormsListWrapper>
        <Box mb={16}>
          <Input
            clearButton
            icon="magnifying-glass"
            iconPosition="left"
            id="group_member_search"
            placeholder="Search form by name"
            variant="default"
            value={search}
            onChange={handleOnChangeSearch}
            onClear={handleResetSearch}
          />
        </Box>
        <Box>
          {isFormListLoading ? (
            <Box height="200px">
              <LoadingSpinner />
            </Box>
          ) : isError && errorText ? (
            <Box>
              <InfoBox text={errorText} type="error" />
            </Box>
          ) : (
            <TableWrapper>
              <Table
                defaultColumns={FormListColumnData}
                primaryKey={formListPrimaryKey}
                rowData={formListRowData}
                fullWidthTable
                className="table"
              />
            </TableWrapper>
          )}
          <PaginationWrapper>
            {!isFormListLoading && data && totalItems > PAGE_SIZE && (
              <Pagination
                totalCount={totalItems}
                currentPage={currentPage}
                pageSize={PAGE_SIZE}
                onPageChange={handleOnPageChange}
                buttonSize="large"
              />
            )}
          </PaginationWrapper>
        </Box>
      </FormsListWrapper>
    </FormsListPage>
  );
};

FormsPage.requireAuth = true;

export default FormsPage;
