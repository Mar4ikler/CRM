import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../helpers/logout';

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <>
            <ListGroup defaultActiveKey="#link1">
                <ListGroup.Item action href="#link1">
                    Kanban
                </ListGroup.Item>
                <ListGroup.Item action onClick={() => navigate('/tasks')} href="#link2">
                    Tasks
                </ListGroup.Item>
                <ListGroup.Item action onClick={() => navigate('/admin')} href="#link3">
                    Admin panel
                </ListGroup.Item>
                <ListGroup.Item action onClick={() => logout()} href="#link4">
                    Logout
                </ListGroup.Item>
            </ListGroup>
        </>
    );
};

export default NavBar;
