import { useEffect, useState } from 'react';
import { taskQueries } from '../../graphQL/task/task.queries';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { DtPicker } from 'react-calendar-datetime-picker';
import 'react-calendar-datetime-picker/dist/style.css';
import { userQueries } from '../../graphQL/user/user.queries';
import { taskMutations } from '../../graphQL/task/task.mutations';
import { useNavigate } from 'react-router-dom';

const TasksView = () => {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [show, setShow] = useState(false);
    const [developers, setDevelopers] = useState([]);
    const [clients, setClients] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [developer, setDeveloper] = useState('');
    const [client, setClient] = useState('');
    const [date, setDate] = useState({});
    const [addedTask, setAddedTask] = useState({});

    const handleNameChange = (event) => setName(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);
    const handlePriceChange = (event) => setPrice(event.target.value);
    const handleDeveloperChange = (event) => setDeveloper(event.target.value);
    const handleClientChange = (event) => setClient(event.target.value);
    const handleDateChange = (event) => setDate(event);

    const [getTasks] = useLazyQuery(taskQueries.GET_TASKS, {
        onCompleted: (data) => {
            setTasks(data.getTasks.tasks);
        },
        fetchPolicy: 'network-only',
    });

    useEffect(() => {
        getTasks({
            variables: {
                getTasksInput: { filterString: '', skip: 0, limit: -1 },
            },
            fetchPolicy: 'network-only',
        });
    }, [addedTask]);

    const [getDevelopers] = useLazyQuery(userQueries.GET_USERS, {
        onCompleted: (data) => {
            setDevelopers(data.getUsers.users);
        },
        fetchPolicy: 'network-only',
    });

    const [getClients] = useLazyQuery(userQueries.GET_USERS, {
        onCompleted: (data) => {
            setClients(data.getUsers.users);
        },
        fetchPolicy: 'network-only',
    });

    const handleClose = () => setShow(false);
    const handleShow = () => {
        getDevelopers({
            variables: {
                getUsersInput: { filterString: 'DEVELOPER', skip: 0, limit: -1 },
            },
        });
        getClients({
            variables: {
                getUsersInput: { filterString: 'CLIENT', skip: 0, limit: -1 },
            },
        });
        setShow(true);
    };

    const [addTask] = useMutation(taskMutations.CREATE_TASK, {
        onCompleted: (data) => {
            setAddedTask(data);
            setShow(false);
        },
    });

    const handleAddTask = () => {
        addTask({
            variables: {
                createTaskInput: {
                    name: name,
                    description: description,
                    price: +price,
                    developers: [developer],
                    client: client,
                    startDate: `${date.from.year}-${date.from.month}-${date.from.day}`,
                    endDate: `${date.to.year}-${date.to.month}-${date.to.day}`,
                    status: 'NEW',
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
                        <th>Task name</th>
                        <th>Creator</th>
                        <th>Developer</th>
                        <th>Client</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((item, index) => (
                        <tr key={index} onClick={() => navigate('/task', { state: { item } })}>
                            <td>{++index}</td>
                            <td>{item.name}</td>
                            <td>{item.creator.nickname}</td>
                            <td>{item.client.nickname}</td>
                            <td>{item.developers[0].nickname}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={5}>
                            <Button
                                variant="primary"
                                onClick={() => {
                                    handleShow();
                                }}
                            >
                                Add task
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
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                autoFocus
                                onChange={handleNameChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter description"
                                onChange={handleDescriptionChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter price"
                                onChange={handlePriceChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                            <Form.Label>Developer</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                onChange={handleDeveloperChange}
                            >
                                <option>Select developer</option>
                                {developers.map((item, index) => (
                                    <option value={item._id} key={index}>
                                        {item.nickname}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                            <Form.Label>Client</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                onChange={handleClientChange}
                            >
                                <option>Select client</option>
                                {clients.map((item, index) => (
                                    <option value={item._id} key={index}>
                                        {item.nickname}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                            <Form.Label>Period</Form.Label>
                            <DtPicker type={'range'} onChange={handleDateChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddTask}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default TasksView;
