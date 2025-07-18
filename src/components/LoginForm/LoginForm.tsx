import React, { memo, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<string | null>(null);
    // const navigate = useNavigate();

    const validatePassword = (password: string) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validatePassword(password)) {
            setErrors('Password must be 8+ characters, include 1 uppercase, 1 number, and 1 symbol.');
            return;
        }

        setErrors(null);
        // navigate('/home');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h4 className="mb-3">Sign In</h4>
            <p>
                New user? <a>Create an account</a>
            </p>
            <Form.Group className="mb-3">
                <Form.Control
                    type="email"
                    placeholder="Username or email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Check label="Keep me signed in" />
            </Form.Group>
            {errors && <div className="text-danger mb-3">{errors}</div>}
            <Button type="submit" className="w-100 btn-dark">
                Sign In
            </Button>
            <hr />
            <div className="social-icons text-center">
                <i className="bi bi-google mx-2"></i>
                <i className="bi bi-facebook mx-2"></i>
                <i className="bi bi-linkedin mx-2"></i>
                <i className="bi bi-twitter mx-2"></i>
            </div>
        </Form>
    );
};

export default memo(LoginForm);
