import { useLazyQuery, useMutation } from '@apollo/client';
import { userQueries } from '../../graphQL/user/user.queries';
import { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { userMutations } from '../../graphQL/user/user.mutations';

const AdminView = () => {
    const [users, setUsers] = useState([]);
    const [blockedUser, setBlockedUser] = useState({});
    const [deletedUser, setDeletedUser] = useState({});
    const [addedUser, setAddedUser] = useState({});
    const [updatedUser, setUpdatedUser] = useState({});
    const [show, setShow] = useState(false);
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [selectedUserId, setSelectedUserId] = useState('');
    const [isAddButton, setIsAddButton] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleNicknameChange = (event) => setNickname(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handleRoleChange = (event) => setRole(event.target.value);

    const [getUsers] = useLazyQuery(userQueries.GET_USERS, {
        onCompleted: (data) => {
            setUsers(data.getUsers.users);
        },
        fetchPolicy: 'network-only',
    });

    useEffect(() => {
        getUsers({
            variables: {
                getUsersInput: { filterString: '', skip: 0, limit: 10 },
            },
        });
    }, [blockedUser, deletedUser, addedUser, updatedUser]);

    const [blockUser] = useMutation(userMutations.BLOCK_USER, {
        onCompleted: (data) => {
            setBlockedUser(data);
        },
    });

    const handleBlockUser = (id, block) => {
        blockUser({
            variables: {
                blockUserInput: { _id: id, isBlocked: block },
            },
        });
    };

    const [deleteUser] = useMutation(userMutations.DELETE_USER, {
        onCompleted: (data) => {
            setDeletedUser(data);
        },
    });

    const handleDeleteUser = (id) => {
        deleteUser({
            variables: {
                userId: id,
            },
        });
    };

    const [addUser] = useMutation(userMutations.ADD_USER, {
        onCompleted: (data) => {
            setAddedUser(data);
            setShow(false);
        },
    });

    const handleAddUser = () => {
        addUser({
            variables: {
                createUserInput: {
                    nickname: nickname,
                    email: email,
                    password: password,
                    role: role,
                },
            },
        });
    };

    const [updateUser] = useMutation(userMutations.UPDATE_USER, {
        onCompleted: (data) => {
            setUpdatedUser(data);
            setShow(false);
        },
    });

    const handleUpdateUser = () => {
        updateUser({
            variables: {
                updateUserInput: {
                    _id: selectedUserId,
                    email: email,
                    nickname: nickname,
                    password: password,
                    role: role,
                },
            },
        });
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nickname</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>isBlocked</th>
                        <th>Update</th>
                        <th>Block</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((item, index) => (
                        <tr key={index}>
                            <td>{++index}</td>
                            <td>{item.nickname}</td>
                            <td>{item.email}</td>
                            <td>{item.role}</td>
                            <td>{item.isBlocked ? 'true' : 'false'}</td>
                            <td>
                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        setIsAddButton(false);
                                        setSelectedUserId(item._id);
                                        handleShow();
                                    }}
                                >
                                    Update
                                </Button>
                            </td>
                            <td>
                                {item.isBlocked ? (
                                    <Button
                                        variant="success"
                                        onClick={() => handleBlockUser(item._id, false)}
                                    >
                                        Unblock
                                    </Button>
                                ) : (
                                    <Button
                                        variant="warning"
                                        onClick={() => handleBlockUser(item._id, true)}
                                    >
                                        Block
                                    </Button>
                                )}
                            </td>
                            <td>
                                <Button variant="danger" onClick={() => handleDeleteUser(item._id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={7}>
                            <Button
                                variant="primary"
                                onClick={() => {
                                    setIsAddButton(true);
                                    handleShow();
                                }}
                            >
                                Add user
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Modal window</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nickname</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter nickname"
                                autoFocus
                                onChange={handleNicknameChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                onChange={handleEmailChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                onChange={handlePasswordChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                            <Form.Label>Role</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                onChange={handleRoleChange}
                            >
                                <option>Select role</option>
                                <option value="MANAGER">MANAGER</option>
                                <option value="DEVELOPER">DEVELOPER</option>
                                <option value="CLIENT">CLIENT</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={isAddButton ? handleAddUser : handleUpdateUser}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AdminView;
