import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import NavLink from 'react-bootstrap/NavLink';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './Profile.scss';

const PasswordEdit = props => {
    const { user } = props;
    if (!user) return null;

    const [password, setPassword] = useState('');

    const handleInputChange = event => {
        setPassword(event.target.value);
    };

    const handleUpdatePassword = () => {
        let accessToken = localStorage.getItem('token');

        axios({
            method: 'put',
            url: `https://mymusicalflix.herokuapp.com/users/${user.id}/password`,
            headers: { Authorization: `Bearer ${accessToken}` },
            data: { Password: password }
        })
            .then(() => {
                console.log('password successfully changed');
            })
            .catch(error => console.log(error + ` error updating password`));
    };

    return (
        <Container>
            <Row className="profile-heading">
                <Col sm={{ span: 8, offset: 2 }}>
                    <h1 className="profile-heading">Change Password</h1>
                </Col>
            </Row>

            <Row className="profile-navbar">
                <Col sm={{ span: 10, offset: 1 }}>
                    <Nav fill variant="tabs">
                        <Nav.Item>
                            <NavLink as={Link} to={`/users/${user.id}`}>
                                <Button
                                    className="profile-tab active"
                                    variant="link"
                                    onClick={() => props.setEditOff()}
                                >
                                    View
                                    </Button>
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink as={Link} to={`/users/${user.id}`}>
                                <Button
                                    className="profile-tab"
                                    variant="link"
                                    onClick={() => props.setEditOn()}
                                >
                                    Edit
                                    </Button>
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink as={Link} to={`/users/${user.id}/password`} className="active">
                                <Button
                                    className="profile-tab"
                                    variant="link"
                                >
                                    Password
                                    </Button>
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink as={Link} to={`/users/${user.id}/delete`}>
                                <Button
                                    className="profile-tab"
                                    variant="link"
                                >
                                    Account
                                    </Button>
                            </NavLink>
                        </Nav.Item>
                    </Nav>
                </Col>
            </Row>

            <Row>
                <Col sm={{ span: 8, offset: 2 }}>
                    <Form className="profile-form">
                        <Form.Group controlId="formUsername">
                            <Form.Label className="profile-form-label">New password:</Form.Label>
                            <Form.Control
                                className="profile-form-value"
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Button
                            className="profile-button"
                            variant="primary"
                            onClick={() => {
                                handleUpdatePassword();
                            }}
                        >
                            Update password
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );

};

export default PasswordEdit;