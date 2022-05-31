import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Pagination } from '@material-ui/lab';
import Select from 'react-select';

const TablePagination = ({ pageNumbers, value, onPageSearch, totalPages, handlePagination }) => {

    return (

        <div className="pagination-container">
            <div>
                <Select
                    className="w-110px"
                    options={pageNumbers}
                    value={value}
                    placeholder={value}
                    onChange={(value) => { onPageSearch(value) }}
                    isSearchable
                />
            </div>
            <div className="paginate">
                <Pagination
                    count={totalPages}
                    page={value}
                    boundaryCount={1}
                    siblingCount={0}
                    showFirstButton
                    showLastButton
                    onChange={handlePagination}
                    color="secondary" />
            </div>
        </div>
    )
}

export default TablePagination;

