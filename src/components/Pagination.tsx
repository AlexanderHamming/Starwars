import Button from "react-bootstrap/Button";
import PaginationPrips from "../types/Pagination";


const Pagination: React.FC<PaginationPrips> = ({
    hasNextPage,
    hasPreviousPage,
    onNextPage,
    onPreviousPage,
    currentPage,
    totalPages,
  }) => { return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="prev">
        <Button
          disabled={!hasPreviousPage}
          onClick={onPreviousPage}
          variant="primary"
        >
          Previous Page
        </Button>
      </div>

      <div className="page">
        Page {currentPage}
        {totalPages && <>/{totalPages}</>}
      </div>

      <div className="next">
        <Button
          disabled={!hasNextPage}
          onClick={onNextPage}
          variant="primary"
        >
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default Pagination;