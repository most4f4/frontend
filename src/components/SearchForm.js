// components/SearchForm.js
import { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col, ButtonGroup, Container } from 'react-bootstrap';
import BookCard from './BookCard';
import { totalBooksAtom, currentPageAtom } from '@/store/atoms';
import { useAtom } from 'jotai';
import CreatePagination from './Pagination';

export default function SearchForm() {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("");
    const [books, setBooks] = useState([]);
    const [error, setError] = useState("");
    const [totalBooks, setTotalBooks] = useAtom(totalBooksAtom);
    const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
    const booksPerPage = 9;

    const handleSubmit = (e) => {
        e.preventDefault();
         
        let searchQuery = "";
        if (query) searchQuery += query;
        if (category) searchQuery += `+subject:${category}`;
         
        if (!searchQuery) {
          setError("Please enter a book name or category.");
          return;
        }

        setError("");

        fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=40&key=${process.env.NEXT_PUBLIC_KEY}`)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => {
              console.log("Fetched Book Data:", data.items);
              setBooks(data.items || []);
              setCurrentPage(1);
          })
          .catch(err => {
              console.error(err);
              setError("Failed to fetch data from Google Books API.");
          });
    };

    useEffect(() => {
        setTotalBooks(books.length);
    }, [books, setTotalBooks]);

    const startIndex = (currentPage - 1) * booksPerPage;
    const paginatedBooks = books.slice(startIndex, startIndex + booksPerPage);

    return (
        <Container>
        <div className="formContainer">
            <Card bg="light" className="card">
                <Card.Body>
                    <h2>Search Your Books</h2>
                    Enter your search criteria below:
                </Card.Body>
            </Card>
            <Form onSubmit={handleSubmit} className="form">
                <Form.Group>
                    <Form.Label>Book Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </Form.Group>
                <br />
                <div className="text-center">
                    <Button variant="secondary" type="submit">
                        Search
                    </Button>
                </div>
            </Form>
            {error && <p className="error">{error}</p>}
        </div>
        <div className='pt-4'>
            <Row className="justify-content-center">
                {paginatedBooks.map((bookData) => (
                    <Col key={bookData.id} xs={12} sm={6} md={4} className="mb-4 d-flex justify-content-center">
                        <BookCard book={bookData}/>
                    </Col>
                ))}
            </Row>
        </div>
        {paginatedBooks.length > 0 && (
            <div className="d-flex justify-content-center">
                <CreatePagination />
            </div>
        )}
        </Container>
    );
}
