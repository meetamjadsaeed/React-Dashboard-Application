import React, { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ paginationProps }) => {
  const { apiData, setCurrentPage, currentPage } = paginationProps ?? {};

  console.log(apiData, "apiData")

  const { total, per_page, data } = apiData || {};

  const [pageCount, setPageCount] = useState(0);

  const handlePageClick = () => {
    setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (total && per_page) {
      setPageCount(Math.ceil(total / per_page));
    }
  }, [total, per_page]);

  if (data?.length > 0) {
    return (
      <div className="paginations-wrapper">
        <div className="pagination-container mt-5">
          <ReactPaginate
            previousLabel="&laquo;"
            nextLabel="&raquo;"
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination-all"}
            pageClassName={"pagination"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      </div>
    );
  }

  return null;
};

export default Pagination;
