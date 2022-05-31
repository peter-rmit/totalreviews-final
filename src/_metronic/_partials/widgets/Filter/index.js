import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Form, InputGroup } from 'react-bootstrap';
import { RowsFilters } from '../../../../app/utils/filter-schemas';


const Filters = ({ handleSearch, rows, setRows, filter, handleFilter, data, day, dayFilter, handleDayFilter }) => {


    return (
        <>
            <InputGroup>
                <Form.Control
                    className="searchbar"
                    placeholder="Search..."
                    aria-label="Search"
                    onChange={handleSearch}
                    aria-describedby="basic-addon2"
                />

                <Form.Control as="select" defaultValue={rows} onChange={(event) => setRows(event.target.value)}>
                    {
                        RowsFilters.map(({ value, label }) => (
                            <option value={value}>{label}</option>
                        ))
                    }
                </Form.Control>
                {
                    data ?
                        <Form.Control as="select" defaultValue={filter} onChange={handleFilter}>
                            {
                                data.map(({ value, label }) => (
                                    <option value={value}>{label}</option>
                                ))
                            }
                        </Form.Control>
                        :
                        ''
                }
                {
                    day ?
                        <Form.Control as="select" defaultValue={day} onChange={handleDayFilter}>
                            {
                                dayFilter.map(({ value, label }) => (
                                    <option value={value}>{label}</option>
                                ))
                            }
                        </Form.Control>
                        :
                        ''
                }

            </InputGroup>
        </>
    )
}
export default Filters;