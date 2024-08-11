// components/BookCard.js
import { useState } from 'react';
import { Form, Button, Card, Row, Col, Modal } from 'react-bootstrap';
import { addBook, removeBook } from '../../lib/authenticate';
import { useRouter } from 'next/router';

export default function BookCard({book}) {
    const router = useRouter();
    
    //Card CSS Classes:
    const cardStyle = {
        height: '100%',
        maxWidth: '75%',
        overflow: 'hidden'
    };

    const imgStyle = {
        maxHeight: '200px',
        objectFit: 'contain'
    };

    //bookId, title, authors, thumbnail
    const addBookToFavorites = (book) => {
      const { volumeInfo } = book;
      if (!volumeInfo) {
          console.error("Attempted to add an invalid book: ", book);
          return;
      }

      const bookId = book.id || volumeInfo.id || 'No ID';
      const title = volumeInfo.title || 'No Title';
      const subtitle = volumeInfo.subtitle || 'No Subtitle';
      const publisher = volumeInfo.publisher || 'Unknown Publisher';
      const authors = volumeInfo.authors?.join(', ') || 'Unknown Author';
      const thumbnail = volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150';
      const description = volumeInfo.description || 'No Description Available';

      addBook(bookId, title, subtitle, publisher, authors, thumbnail, description)
          .then(() => {
              console.log("Book successfully added to favorites list");
              router.push("/");
          })
          .catch(err => {
              console.error("Error adding book:", err.message);
          });
    };

    const removeBookFromFavorites = (book) => {
      const bookId = book.bookId || book.id;

      removeBook(bookId)
          .then(() => {
              console.log("Book successfully removed from favorites list");
              router.reload();
          })
          .catch(err => {
              console.error("Error removing book:", err.message);
          });
  };

    //Modal (popup) element to display extended book information
    function MyVerticallyCenteredModal({book, ...props}) {
      const title = book.volumeInfo?.title || book.title || 'No Title Available';
      const subtitle = book.volumeInfo?.subtitle || book.subtitle || 'No Subtitle Available';
      const publisher = book.volumeInfo?.publisher || book.publisher || 'Unknown Publisher';
      const authors = book.volumeInfo?.authors || book.authors || ['Unknown Author'];
      const description = book.volumeInfo?.description || book.description || 'No Description Available';
      const thumbnail = book.volumeInfo?.imageLinks?.thumbnail || book.thumbnail || 'https://via.placeholder.com/150';

        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                {title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4 style={{ marginBottom: '20px' }}>{authors}</h4>
              <p><strong>Subtitle:</strong> {subtitle}</p>
              <p><strong>Publisher:</strong> {publisher}</p>
              <p>{description}</p>
            </Modal.Body>
            <Modal.Footer>
                {router.pathname !== '/favorites' && (
                    <Button variant="primary" onClick={() => addBookToFavorites(book)}>
                        Add To Favorites
                    </Button>
                )}
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }

    const [modalShow, setModalShow] = useState(false);
    const title = book.volumeInfo?.title || book.title || 'No Title Available';
    const authors = book.volumeInfo?.authors || book.authors || ['Unknown Author'];
    const thumbnail = book.volumeInfo?.imageLinks?.thumbnail || book.thumbnail || 'https://via.placeholder.com/150';

    return (
        <Card style={cardStyle} className="h-100">
            <Card.Img
                variant="top"
                src={thumbnail}
                alt={title}
                style={imgStyle}
            />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{authors}</Card.Text>
            </Card.Body>
            <div className="d-flex flex-column p-2">
                <Button variant="primary" className="mb-2" onClick={() => setModalShow(true)}>
                    Show more
                </Button>
                {router.pathname !== '/favorites' && (
                    <Button variant="primary" className="mb-2" onClick={() => addBookToFavorites(book)}>
                        Add To Favorites
                    </Button>
                )}
                {router.pathname === '/favorites' && (
                    <Button variant="danger" className="mb-2" onClick={() => removeBookFromFavorites(book)}>
                        Remove From Favorites
                    </Button>
                )}
            </div>
            <MyVerticallyCenteredModal book={book}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Card>
    )
}