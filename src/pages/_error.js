import { useRouter } from 'next/router';
import { Container, Row, Col, Alert, Button, Card } from 'react-bootstrap';

export default function CustomErrorPage() {
  const router = useRouter();

  return (
    <Container className="pt-4">
                <Row className="justify-content-center">
                    <Col xs={12} sm={8} md={6} lg={4}>
                        <Card className="text-center">
                            <Card.Body>
                                <Card.Title>Error!</Card.Title>
                                <Alert variant="warning">
                                    You need to log in.
                                </Alert>
                                <Button href="/login" variant="primary" className="me-2">
                                    Log In
                                </Button>
                                <Button href="/register" variant="secondary">
                                    Register
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
        </Container>
  );
}
