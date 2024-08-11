//pages/favorites.js

import {Row, Col, Container } from "react-bootstrap";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BookCard from "@/components/BookCard";
import { getFavorites, isAuthenticated  } from "../../lib/authenticate";

export default function Login() {
    const [favorites, setFavorites] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/_error');
            return;
        }

        getFavorites()
            .then(data => {
                setFavorites(data.favorites);
                console.log(data)
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <Container>
            <h1 className="text-center my-4">Your Favorite Books</h1>
            <Row className="justify-content-center">
                {favorites.map((bookData) => (
                    <Col key={bookData.id} xs={12} sm={6} md={4} className="mb-4 d-flex justify-content-center">
                        <BookCard book={bookData}/>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
