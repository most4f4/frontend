/*********************************************************************************
* WEB422 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Joseph Eiles Student ID: 026501148 Date: 2024-07-02
*
*
********************************************************************************/
//src/components/Pagination.js

//Handles pagination for the rendered city cards
import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import { bookAtom, totalPages, currentPage } from '@/store/atoms';
import { useAtom } from 'jotai';
import { totalBooksAtom, currentPageAtom } from '@/store/atoms';

export default function CreatePagination({books}) {
    const [totalBooks] = useAtom(totalBooksAtom);
    const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
    const [pageCount, setPageCount] = useState(1);

    //Initialize the total number of pages when cityData gets populated
    useEffect(() => {
        setPageCount(Math.ceil(totalBooks / 9));
    }, [totalBooks]);

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

    return (
        <Pagination>
            <Pagination.Prev onClick={() => onPageChange(currentPage > 1 ? currentPage - 1 : currentPage)}/>
            {pages.map((pageNum) => (
                <Pagination.Item key={pageNum} active={pageNum === currentPage} onClick={() => onPageChange(pageNum)}>
                    {pageNum}
                </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => onPageChange(currentPage < pageCount ? currentPage + 1 : currentPage)}/>
        </Pagination>
    );
}