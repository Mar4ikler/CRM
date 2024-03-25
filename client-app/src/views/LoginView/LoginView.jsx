import { Button, Form } from 'react-bootstrap';
import styles from './LoginView.module.css';
import { useMutation } from '@apollo/client';
import { userMutations } from '../../graphQL/user/user.mutations';
import { useState } from 'react';
import { validator } from '../../helpers/validator';

const LoginView = () => {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');

    const handleNicknameChange = (event) => {
        setNickname(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const requiredValidation = () => {
        let isValid = true;
        if (!validator.isRequired(nickname) || !validator.isRequired(password)) {
            alert('Заполните все поля');
            isValid = false;
        }
        return isValid;
    };

    const [login] = useMutation(userMutations.LOGIN, {
        onCompleted: (data) => {
            //const loginData = data.login;
            console.log(data);
        },
        onError: () => {},
    });

    const handleLogin = () => {
        if (requiredValidation()) {
            login({
                variables: {
                    loginUserInput: { username: nickname.trim(), password: password.trim() },
                },
            });
            setNickname('');
            setPassword('');
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginForm}>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nickname</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter nickname"
                            onChange={handleNicknameChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={handlePasswordChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>

                    <Button variant="primary" onClick={handleLogin}>
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default LoginView;
