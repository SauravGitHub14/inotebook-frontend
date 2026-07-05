import '../css/login.css'
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { Link } from "react-router-dom";
import { useEffect } from "react";


const Login = () => {

    // console.log(setIsLoggedIn);
    // console.log(typeof setIsLoggedIn);

    const [credential, setCredential] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    }, [navigate]);



    const host = process.env.REACT_APP_API_URL;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'jwt-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjODkzYmFlMzQ1MDVlZWVhNGFlMzk3In0sImlhdCI6MTY5MDg3NDczMX0.4QhMXoaSojHQrcn77qkCxnAURdD3XbQQBGagz3-tQ-g"
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })


        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // save the auth/ jwt-token and redirect
            // setIsLoggedIn(true);
            localStorage.setItem('token', json.authtoken);

            toast.success("Logged In Successfully")
            navigate("/dashboard")
        }
        else {
            toast.error("Invalid Password or Username!")
        }
    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }



    return (
        <div className="login-page">
            <div className="login-card">
                <Form onSubmit={handleSubmit}>
                    <h1 className='my-5'>Login to iNoteBook </h1>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='d-flex'>Email address</Form.Label>
                        <Form.Control type="email" name="email" value={credential.email} placeholder="Enter email" onChange={onChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className='d-flex'>Password</Form.Label>
                        <Form.Control type={showPassword ? ("text") : ("password")} name="password" value={credential.password} placeholder="Password" onChange={onChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox " onClick={() => setShowPassword((prev) => !prev)}>
                        <Form.Check className="d-flex gap-2" type="checkbox" label="Show Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit" >
                        Login
                    </Button>
                </Form>
                <p className="mt-4">
                    Don't have an account?{" "}
                    <Link to="/signup" className="signup-link">
                        Create one
                    </Link>
                </p>
            </div>
        </div>

    )
}

export default Login