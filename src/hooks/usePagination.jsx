export default function usePagination(pages) {
  const [pageIndex, setPageIndex] = useState(0);
  const isNextDisabled = pageIndex >= pages - 1;
  const isPreviousDisabled = pageIndex === 0;
  const isPaginationHidden = pages === 0;

  const handleNext = () => {
    setPageIndex(pageIndex + 1);
  };

  const handlePrevious = () => {
    setPageIndex(pageIndex - 1);
  };

  return {
    pageIndex,
    isNextDisabled,
    isPreviousDisabled,
    isPaginationHidden,
    handleNext,
    handlePrevious,
  };
}
