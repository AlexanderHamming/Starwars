export default interface PaginationPrips {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
  currentPage: number;
  totalPages?: number;
  isLoading: boolean;
}
