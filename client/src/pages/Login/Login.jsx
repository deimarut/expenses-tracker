import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import styled from "styled-components";

const LoginContainer = styled.div`
    display: flex;
    background-color: lightgrey;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const FormStyled = styled.form`
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 15px;
`;

const LinkStyled = styled(Link)`
    align-self: center;
`;

const FieldSetStyled = styled.fieldset`
    border: 0;
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: center;
`;

export const Login = ({ onSuccess}) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_API_URL}/login`,  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, 
                password
            })
        })
        .then((res) =>  {
            if (res.status === 200) {
                return res.json();
            }
          
            throw new Error('Test error');
        })
        .then((data) => {
            onSuccess(data);
            setIsLoading(false);
        })
        .catch((e) => {
            setError(String(e));
            isLoading(false);
        })

    }

    return (
        <LoginContainer >
            <FormStyled onSubmit={handleLogin}>
                <h1>Expenses tracker</h1>
                <FieldSetStyled disabled={isLoading}>
                    <Input 
                        placeholder="Name" 
                        onChange={(e) => setName(e.target.value)} 
                        value={name}
                        disabled={isLoading}
                    />
                    <Input 
                        placeholder="Password" 
                        type="password"
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password}
                        disabled={isLoading}
                    /> 
                    {error && <div>{error}</div>}
                    <Button disabled={isLoading}>Login</Button>
               
                <LinkStyled to="/register">Register</LinkStyled>
                </FieldSetStyled>
            </FormStyled>
        </LoginContainer>
    )
}