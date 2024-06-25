import React, { useEffect, useState } from 'react';
import styles from './ChatView.module.css';
import { Button, Form, Modal, Toast } from 'react-bootstrap';
import { useLazyQuery, useMutation, useSubscription } from '@apollo/client';
import { chatQueries } from '../../graphQL/chat/chat.queries';
import { convertDate } from '../../helpers/convertDate';
import { chatMutations } from '../../graphQL/chat/chat.mutations';
import { useSelector } from 'react-redux';
import { chatSubscriptions } from '../../graphQL/chat/chat.subscriptions';
import { userQueries } from '../../graphQL/user/user.queries';

const ChatView = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [chats, setChats] = useState([]);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [receiverId, setReceiverId] = useState({});
    const [newChat, setNewChat] = useState(null);
    const userId = useSelector((state) => state.app.user._id);

    // const handleScroll = () => {
    //     const row1Element = document.querySelector(`.${styles.messagesContainer}`);
    //     if (row1Element) {
    //         window.scrollTo({
    //             top: row1Element.offsetTop,
    //             behavior: 'smooth'
    //         });
    //     }
    // };

    const handleNewMessageChange = (event) => setNewMessage(event.target.value);
    const handleReceiverIdChange = (event) => setReceiverId(event.target.value);

    const handleClose = () => setShow(false);

    const handleMessageChange = (event) => setMessage(event.target.value);

    const [getChats] = useLazyQuery(chatQueries.GET_CHATS, {
        onCompleted: (data) => {
            setChats(data.getChats);
            const chat = data.getChats.find((chat) => chat._id === selectedChat?._id);
            if (chat) setSelectedChat(chat);
        },
        fetchPolicy: 'network-only',
    });

    useEffect(() => {
        getChats({
            variables: {
                getChatsInput: { filterString: '', skip: 0, limit: -1 },
            },
        });
    }, [newChat]);

    const [sendMessage] = useMutation(chatMutations.SEND_MESSAGE, {
        onCompleted: (data) => {
            setMessage('');
        },
        fetchPolicy: 'network-only',
    });

    const [sendNewMessage] = useMutation(chatMutations.SEND_MESSAGE, {
        onCompleted: (data) => {
            setNewMessage('');
            setNewChat(data);
            setShow(false);
        },
        fetchPolicy: 'network-only',
    });

    const handleSendMessage = () => {
        sendMessage({
            variables: {
                sendMessagetInput: {
                    receiverId:
                        selectedChat.participants[0]._id === userId
                            ? selectedChat.participants[1]._id
                            : selectedChat.participants[0]._id,
                    text: message,
                },
            },
        });
    };

    const handleNewSendMessage = () => {
        sendNewMessage({
            variables: {
                sendMessagetInput: {
                    receiverId: receiverId,
                    text: newMessage,
                },
            },
        });
    };

    const handleMessage = ({ data }) => {
        setSelectedChat((prev) => ({
            ...prev,
            messages: [...prev.messages, data.data.newMessage],
        }));
    };

    useSubscription(chatSubscriptions.MESSAGE_SUBSCRIPTION, {
        onData: handleMessage,
    });

    const [getUsers] = useLazyQuery(userQueries.GET_USERS, {
        onCompleted: (data) => {
            setUsers(data.getUsers.users);
        },
        fetchPolicy: 'network-only',
    });

    const handleShow = () => {
        getUsers({
            variables: {
                getUsersInput: { filterString: '', skip: 0, limit: -1 },
            },
        });
        setShow(true);
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.userList}>
                <Button variant="primary" onClick={handleShow}>
                    New chat
                </Button>
                {chats.map((chat, index) => (
                    <div
                        key={index}
                        className={styles.userListItem}
                        onClick={() => setSelectedChat(chat)}
                    >
                        {chat.participants[0]._id === userId
                            ? chat.participants[1]?.nickname
                            : chat.participants[0]?.nickname}
                    </div>
                ))}
            </div>
            <div className={styles.chatWindow}>
                {selectedChat && (
                    <div className={styles.selectedChatContainer}>
                        <h2>
                            Chat with{' '}
                            {selectedChat.participants[0]._id === userId
                                ? selectedChat.participants[1].nickname
                                : selectedChat.participants[0].nickname}
                        </h2>
                        <div className={styles.messagesContainer}>
                            {selectedChat.messages?.map((message, index) => (
                                <div
                                    className={
                                        userId === message.author._id
                                            ? styles.messageContainerEnd
                                            : styles.messageContainerStart
                                    }
                                    key={index}
                                >
                                    <Toast className={styles.mess}>
                                        <Toast.Header
                                            closeButton={false}
                                            className={
                                                userId === message.author._id
                                                    ? styles.hedMessMy
                                                    : styles.hedMessYou
                                            }
                                        >
                                            <strong className="me-auto">
                                                {message.author.nickname}
                                            </strong>
                                            <small>{convertDate(message.date)}</small>
                                        </Toast.Header>
                                        <Toast.Body>{message.text}</Toast.Body>
                                    </Toast>
                                </div>
                            ))}
                        </div>
                        <Form>
                            <Form.Group className={styles.send} controlId="formBasicMessage">
                                <Form.Control
                                    type="text"
                                    onChange={handleMessageChange}
                                    placeholder="Enter message"
                                    value={message}
                                />
                                <Button variant="primary" onClick={handleSendMessage}>
                                    Send
                                </Button>
                            </Form.Group>
                        </Form>
                    </div>
                )}
            </div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>New chat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Receiver</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                onChange={handleReceiverIdChange}
                            >
                                <option>Select receiver</option>
                                {users.map((item, index) => (
                                    <option value={item._id} key={index}>
                                        {item.nickname}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Your message</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter message"
                                autoFocus
                                onChange={handleNewMessageChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleNewSendMessage}>
                        Send
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ChatView;
