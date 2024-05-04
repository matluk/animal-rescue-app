import { Box, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import service from "../../utils/pagination";

const pageSize = 9;

export default function AppPagination({ setAnimalsPage, filters, updateTrigger }) {
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const [page, setPage] = useState(1);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = page * pageSize;

    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await service.getData({ from, to }, filters);
        if (isMounted) {
          setPagination((prevPagination) => ({
            ...prevPagination,
            count: response.count,
          }));
          setAnimalsPage(response.data);
          //console.log(response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [page, filters.adoptionFilter, filters.typeFilter, filters.nameFilter, updateTrigger]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    // Reset page to 1 when filters change
    setPage(1);
  }, [filters.adoptionFilter, filters.typeFilter, filters.nameFilter]);

  return (
    <Box
      justifyContent={"center"}
      alignItems="center"
      display={"flex"}
      sx={{ margin: "20px 0px" }}
    >
      <Pagination
        color="primary"
        count={Math.ceil(pagination.count / pageSize)}
        page={page}
        onChange={handlePageChange}
      />
    </Box>
  );
}
