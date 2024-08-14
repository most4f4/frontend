// components/BookCard.js
import { useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { addBook, removeBook } from '../../lib/authenticate';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { authStatusAtom } from '../store/atoms'; 
import { isAuthenticated} from '../../lib/authenticate';


export default function BookCard({book}) {
    const [authStatus, setAuthStatus] = useAtom(authStatusAtom); 
    const router = useRouter();

    useEffect(() => {
        const loggedIn = isAuthenticated(); 
        setAuthStatus(loggedIn);
      }, [setAuthStatus]);


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

      if (!authStatus) {
        router.push('/_error');
        return;
      }

      const bookId = book.id || volumeInfo.id || 'No ID';
      const title = volumeInfo.title || 'No Title';
      const subtitle = volumeInfo.subtitle || 'No Subtitle';
      const publisher = volumeInfo.publisher || 'Unknown Publisher';
      const authors = volumeInfo.authors?.join(', ') || 'Unknown Author';
      const thumbnail = volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150';
      const description = volumeInfo.description || 'No Description Available';

      const category =  volumeInfo.categories?.join(', ') || "Unknown Category"
      const publishDate = volumeInfo.publishedDate || "No Published Date Available"
      const pageCount = volumeInfo.pageCount || "No Page Count Available"

      addBook(bookId, title, subtitle, publisher, authors, thumbnail, description, category, publishDate, pageCount)
          .then(() => {
              console.log("Book successfully added to favorites list");
              setModalShow(false);
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
      const authors = book.volumeInfo?.authors?.join(', ') || book.authors?.join(', ') || ['Unknown Author'];
      const description = book.volumeInfo?.description || book.description || 'No Description Available';
      const thumbnail = book.volumeInfo?.imageLinks?.thumbnail || book.thumbnail || 'https://via.placeholder.com/150';

      const category =  book.volumeInfo?.categories?.join(', ') || book.categories?.join(', ') || "Unknown Category"
      const publishDate = book.volumeInfo?.publishedDate || book.publishedDate || "No Published Date Available"
      const pageCount = book.volumeInfo?.pageCount || book.pageCount || "No Page Count Available"

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
              <p><strong>Category:</strong> {category}</p>
              <p><strong>Publish Date:</strong> {publishDate}</p>
              <p><strong>Page Count:</strong> {pageCount}</p>
              <p>{description}</p>
            </Modal.Body>
            <Modal.Footer>
                {router.pathname !== '/favorites' && (
                    <Button variant="secondary" onClick={() => addBookToFavorites(book)}>
                        Add To Favorites
                    </Button>
                )}
              <Button variant="secondary" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }

    const [modalShow, setModalShow] = useState(false);
    const title = book.volumeInfo?.title || book.title || 'No Title Available';
    const authors = book.volumeInfo?.authors?.join(', ') || book.authors?.join(', ') || ['Unknown Author'];
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
            <div className="d-flex flex-column align-items-center p-2">
                <Button variant="secondary" className="mb-2 w-75" onClick={() => setModalShow(true)}>
                    Show more
                </Button>
                {router.pathname !== '/favorites' && (
                    <Button variant="secondary" className="mb-2 w-75" onClick={() => addBookToFavorites(book)}>
                        Add To Favorites
                    </Button>
                )}
                {router.pathname === '/favorites' && (
                    <Button variant="danger" className="mb-2 w-75" onClick={() => removeBookFromFavorites(book)}>
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