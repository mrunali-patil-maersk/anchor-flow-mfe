import { Icon } from "@anchor/react-components";
import { DOTS, usePagination } from "@hooks/usePagination";
import { PaginationContainer, PaginationItem } from "@styles/components/tasklist/pagination.style";

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  buttonSize = "small",
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }
  if (!paginationRange) {
    return null;
  }
  let lastPage = paginationRange[paginationRange.length - 1];
  const onNext = () => {
    if (currentPage !== lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <PaginationContainer>
      <PaginationItem
        variant={currentPage === 1 ? "disabled" : "default"}
        onClick={onPrevious}
        buttonSize={buttonSize}
      >
        <Icon name="chevron-left" />
      </PaginationItem>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <PaginationItem key={index} variant="dots" buttonSize={buttonSize}>
              &#8230;
            </PaginationItem>
          );
        }

        return (
          <PaginationItem
            key={index}
            variant={currentPage === pageNumber ? "active" : "default"}
            onClick={() => onPageChange(pageNumber)}
            buttonSize={buttonSize}
          >
            {pageNumber}
          </PaginationItem>
        );
      })}
      <PaginationItem
        variant={currentPage === lastPage ? "disabled" : "default"}
        onClick={onNext}
        buttonSize={buttonSize}
      >
        <Icon name="chevron-right" />
      </PaginationItem>
    </PaginationContainer>
  );
};

export default Pagination;
