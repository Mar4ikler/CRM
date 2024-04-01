import { useLocation, useNavigate } from 'react-router-dom';
import styles from './TaskView.module.css';
import { Accordion, Button, Card, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { taskMutations } from '../../graphQL/task/task.mutations';
import { convertDate } from '../../helpers/convertDate';
import { taskQueries } from '../../graphQL/task/task.queries';

const TaskView = () => {
    const navigate = useNavigate();
    const [comment, setComment] = useState('');
    const [addedComment, setAddedComment] = useState({});
    const [currentTask, setCurrentTask] = useState(null);
    const location = useLocation();
    const task = location.state.item;

    const handleCommentChange = (event) => setComment(event.target.value);

    const [addComment] = useMutation(taskMutations.CREATE_COMMENT, {
        onCompleted: (data) => {
            setAddedComment(data);
            setComment('');
        },
    });

    const handleAddComment = () => {
        addComment({
            variables: {
                createCommentInput: {
                    taskId: currentTask._id,
                    text: comment,
                    date: Date.now(),
                },
            },
        });
    };

    const [getTask] = useLazyQuery(taskQueries.GET_TASK, {
        onCompleted: (data) => {
            setCurrentTask(data.getTask);
        },
        fetchPolicy: 'network-only',
    });

    useEffect(() => {
        getTask({
            variables: {
                taskId: task._id,
            },
        });
    }, [addedComment]);

    return (
        <div className={styles.taskContainer}>
            {currentTask && (
                <>
                    <div className={styles.headerContainer}>
                        <Button variant="link" onClick={() => navigate(-1)}>
                            Back
                        </Button>
                        <div>{currentTask.name}</div>
                    </div>
                    <div className={styles.infoContainer}>
                        <div>
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Description</Accordion.Header>
                                    <Accordion.Body>{currentTask.description}</Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                        <div>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>Information about task</Card.Title>
                                    <Card.Text>
                                        Developer: {currentTask.developers[0].nickname}
                                    </Card.Text>
                                    <Card.Text>Client: {currentTask.client.nickname}</Card.Text>
                                    <Card.Text>
                                        Start date: {currentTask.startDate.split('T')[0]}
                                    </Card.Text>
                                    <Card.Text>
                                        End date: {currentTask.endDate.split('T')[0]}
                                    </Card.Text>
                                    <Card.Text>Price: {currentTask.price}$</Card.Text>
                                    <Card.Text>Status: {currentTask.status}</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                    <div className={styles.commentContainer}>
                        <div>Comments</div>
                        <div>
                            <Form>
                                <Form.Group className="mb-3" controlId="formComment">
                                    <Form.Control
                                        type="text"
                                        placeholder="Write your comment"
                                        as="textarea"
                                        rows={3}
                                        onChange={handleCommentChange}
                                        value={comment}
                                    />
                                </Form.Group>
                                <Button variant="primary" onClick={handleAddComment}>
                                    Send
                                </Button>
                            </Form>
                        </div>
                        <div className={styles.comments}>
                            {currentTask.comments.map((item, index) => {
                                const dateTime = convertDate(item.date);
                                return (
                                    <Card key={index}>
                                        <Card.Body>
                                            <Card.Title>{item.user.nickname}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">
                                                {item.user.role}
                                            </Card.Subtitle>
                                            <Card.Text>{item.text}</Card.Text>
                                            <Card.Subtitle className="mb-2 text-muted">
                                                {dateTime}
                                            </Card.Subtitle>
                                        </Card.Body>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default TaskView;
