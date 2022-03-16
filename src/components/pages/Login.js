import React, { useState, useEffect } from 'react';
import { PageLayout, Input, PasswordInput, Button, Spinner } from 'components/common';
import styled from 'styled-components';

const Form = styled.form`
    width: 100%;
    max-width: 400px;
    background: white;
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 16px;
    box-sizing: border-box;
    color: black;

    .alt-text {
        text-align: center;
        margin: 10px 0;
    }

    // Technique below demonstrates how to reference a styled component from within another styled component.
    // Here, we are accessing the Button styled component within the Form styled component.
    // We only want to add space above the Login button, not any other buttons (note: Register and Random buttons also exist).
    // For the <Button> components of parent <Form>, first-of-type grabs the Login button, but this is not sufficient as the
    // Random button (just for demo purposes in this discussion, now commented out) would also be selected as it is the first
    // element of its parent div container. Adding the greater than '>' selector ensures we only apply space above the Login button
    // and do not drill down any further in the DOM. See Header.js for another example of the '>' CSS selector.
    > ${Button}:first-of-type {
        margin-top: 40px;
    }

    > ${Input} {
        margin-top: 20px;
    }
`;

let timeout;

const Login = () => {
    const [formFields, setFormFields] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        // e.persist();    // In React <= 16, event object could be lost due to asynchronous nature of setState, but this has been fixed in React 17.
        setFormFields(s => ({
            ...s,
            [e.target.name]: e.target.value
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();     // Avoid page refresh on Enter.
        setLoading(true);
        timeout = setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    useEffect(() => {
        return () => {  // Define function that will only be returned when the component unmounts. This clears timer in case it is running when user navigates away from page.
            if (timeout) { clearTimeout(timeout); }
        };
    }, []);

    return (
        <PageLayout>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                {loading ? <Spinner /> :
                    <>
                        {/* <div><Button>Random</Button></div> */}
                        <span>Log in if you have an account</span>
                        <Input
                            type="text"
                            name="username"
                            placeholder='username'
                            onChange={handleInputChange}
                            value={formFields.username}
                        />
                        <PasswordInput
                            name="password"
                            onChange={handleInputChange}
                            value={formFields.password}
                        />
                    </>
                }
                <Button large type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Login'}
                </Button>
                {!loading &&
                    <>
                        <div className='alt-text'>or</div>
                        <Button secondary type="button">Register</Button>
                    </>
                }
            </Form>
        </PageLayout>
    );
};

export default Login;