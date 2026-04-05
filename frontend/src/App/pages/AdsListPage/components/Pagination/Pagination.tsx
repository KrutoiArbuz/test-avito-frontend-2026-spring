import { Pagination as MuiPagination } from '@mui/material';

type PaginationProps = {
  count: number;
  page: number;
  onChange: (page: number) => void;
};

const Pagination = ({ count, page, onChange }: PaginationProps) => (
  <MuiPagination
    count={count}
    page={page}
    onChange={(_, value) => onChange(value)}
    shape="rounded"
  />
);
export default Pagination;
