import { Input } from "@anchor/react-components";

import { SectionWrapper, SortButton } from "@styles/components/tasklist/searchSortFilter.style";
import { ChangeEvent } from "react";

export type SortValueType = "asc" | "desc";

export interface SearchSortFilterProps {
  searchValue: string;
  onSearch: (value: string) => void;
  sortValue: SortValueType;
  onSort: (value: SortValueType) => void;
}

const SearchSortFilter = ({ searchValue, onSearch, onSort, sortValue }: SearchSortFilterProps) => {
  const handleOnSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (onSearch) {
      onSearch(value);
    }
  };
  const handleOnClear = () => {
    if (onSearch) {
      onSearch("");
    }
  };
  const handleOnSort = () => {
    const value: SortValueType = sortValue === "asc" ? "desc" : "asc";
    if (onSort) {
      onSort(value);
    }
  };
  return (
    <SectionWrapper>
      <Input
        id="search-input-task-list"
        clearButton
        icon="magnifying-glass"
        iconPosition="left"
        value={searchValue}
        onChange={handleOnSearch}
        onClear={handleOnClear}
        placeholder="Search task"
      />
      <SortButton $variant={sortValue} onClick={handleOnSort}>
        <svg
          width="22"
          height="11"
          viewBox="0 0 22 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.89226 11.0001C5.25359 11.0002 5.58685 10.8053 5.76399 10.4904L7.8706 6.74512L6.99902 6.25488L4.89241 10.0001L4.43481 10.0001L4.43481 0H3.43481L3.43481 9.99998L2.97724 9.99996L0.870594 6.25487L-0.000976562 6.74513L2.10567 10.4902C2.28278 10.8051 2.61594 10.9999 2.9772 11L4.89226 11.0001ZM9.99951 3.00014H21.9995V2.00014H9.99951V3.00014ZM9.99951 6.00014H18.6662V5.00014H9.99951V6.00014ZM9.99951 9.00014H15.3328V8.00014H9.99951V9.00014Z"
          />
        </svg>
      </SortButton>
    </SectionWrapper>
  );
};

export default SearchSortFilter;
