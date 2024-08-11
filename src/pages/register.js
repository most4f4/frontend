// pages/register.js
import { Card, Form, Alert, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState} from 'react';
import { useRouter } from 'next/router';
import { registerUser } from '../../lib/authenticate'; 

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [warning, setWarning] = useState("");
    const router = useRouter();

    const onSubmit = (data) => {
        registerUser(data.name, data.username, data.password)
        .then(response => {
            console.log(response.message);
            router.push("/");
        })
        .catch(err => {
            setWarning(err.message);
        });
    };

    return (
        <div className="formContainer">
            <Card bg="light" className="card">
                <Card.Body>
                    <h2>Sign up</h2>
                    Enter your personal information below:
                </Card.Body>
            </Card>
            <br />
            <Form onSubmit={handleSubmit(onSubmit)} className="form">
                <Form.Group>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control 
                        type="text" 
                        id="name" 
                        {...register('name', { required: "Name is required" })}
                    />
                    {errors.name && <Alert variant="danger">{errors.name.message}</Alert>}
                </Form.Group>
                <br/>
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
                        {...register('password', { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
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
                <Button variant="primary" className="pull-right" type="submit">Sign up</Button>
            </Form>
        </div>
    );
}
