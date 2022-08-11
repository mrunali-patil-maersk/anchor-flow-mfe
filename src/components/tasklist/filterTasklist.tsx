import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";

import { Box, Button, Icon, Typography } from "@anchor/react-components";
import {
  FilterButtonWrapper,
  FilterCards,
  FilterItem,
  FilterSection,
  FiltersWrapper,
} from "@styles/components/tasklist/filterTasklist.style";
import { StyledTypography } from "@styles/components/tasklist/tasklist.style";
import { filters, SortByItemType } from "@/configs/taskFilter.constant";
import useOnClickOutside from "@hooks/useOnClickOutside";

interface SortBySelectionPropsType {
  sortBy: SortByItemType;
  onSelect: (sortBy: SortByItemType) => void;
}

const SortOrderPopup = ({ sortBy, onSelect }: SortBySelectionPropsType) => {
  const [isSortPopupOpen, setIsSortPopupOpen] = useState<boolean>(false);

  const sortByContainerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(sortByContainerRef, () => setIsSortPopupOpen(false));

  const handleToggleSortByPopup = (e: MouseEvent<Element, globalThis.MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsSortPopupOpen((prev) => !prev);
  };

  const handleSelectSortBy = (item: SortByItemType) => {
    if (onSelect) {
      onSelect(item);
    }
    setIsSortPopupOpen(false);
  };

  return (
    <FilterSection>
      <FiltersWrapper>
        <Box
          display="flex"
          onClick={handleToggleSortByPopup}
          alignItems="center"
          mr={24}
          color="functional.grey.800"
        >
          <StyledTypography paragraph={true} variant="h4" fontStyle="normal">
            {sortBy.value}
          </StyledTypography>
        </Box>
        <FilterButtonWrapper ref={sortByContainerRef}>
          <Button
            label="Filters"
            onClick={handleToggleSortByPopup}
            icon="bars-horizontal-funnel-down"
            iconPosition="right"
            variant="plain"
            size="small"
          />
          {isSortPopupOpen && (
            <FilterCards>
              {filters &&
                filters.map(({ key, value }: SortByItemType) => {
                  const isSelected = key === sortBy.key;
                  return (
                    <FilterItem key={key} onClick={() => handleSelectSortBy({ key, value })}>
                      {isSelected ? (
                        <Icon name="check" size="20" />
                      ) : (
                        <Box display="inline-block" width="20px" height="20px" />
                      )}
                      <Typography variant="body1" fontStyle="normal">
                        {value}
                      </Typography>
                    </FilterItem>
                  );
                })}
            </FilterCards>
          )}
        </FilterButtonWrapper>
      </FiltersWrapper>
    </FilterSection>
  );
};

export default SortOrderPopup;
