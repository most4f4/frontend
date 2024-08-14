//src/components/Pagination.js

import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { totalBooksAtom, currentPageAtom } from '@/store/atoms';

export default function CreatePagination({books}) {
    const [totalBooks] = useAtom(totalBooksAtom);
    const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
    const [pageCount, setPageCount] = useState(1);

    useEffect(() => {
        setPageCount(Math.ceil(totalBooks / 9));
    }, [totalBooks]);

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

    return (
        <Pagination className="custom-pagination">
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