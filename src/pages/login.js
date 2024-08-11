//pages/login.js

import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState} from 'react';
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import { authenticateUser } from '../../lib/authenticate';
import { useSetAtom } from 'jotai';
import { authStatusAtom } from '../store/atoms';


export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [warning, setWarning] = useState("");
    const router = useRouter();
    const setAuthStatus = useSetAtom(authStatusAtom);


    const onSubmit = (data) => {
        authenticateUser(data.username, data.password)
        .then(() => {
          console.log("User logged in");
          setAuthStatus(true);
          router.push("/");
        })
        .catch(err => {
          setWarning(err.message || 'Failed to login');
        });
    }

    return (
        <div className="formContainer">
            <Card bg="light" className="card">
                <Card.Body>
                    <h2>Sign in</h2>
                    Enter your login information below:
                </Card.Body>
            </Card>
            <br />
            <Form onSubmit={handleSubmit(onSubmit)} className="form">
                <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control 
                        type="text" 
                        id="username" 
                        {...register('username', { required: "Username is required" })}
                    />
                    {errors.username && <Alert variant="danger">{errors.username.message}</Alert>}
                </Form.Group>
                <br/>
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control 
                        type="password" 
                        id="password" 
                        {...register('password', { required: "Password is required"})}
                    />
                    {errors.password && <Alert variant="danger">{errors.password.message}</Alert>}
                </Form.Group>
                <br/>
                {warning &&
                    <Alert variant="danger">
                        {warning}
                    </Alert>
                }
                <br/>
                <Button variant="primary" className="pull-right" type="submit">Sign in</Button>
            </Form>
        </div>
    );
}
