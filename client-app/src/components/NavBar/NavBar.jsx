import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../helpers/logout';
import { useSelector } from 'react-redux';

const NavBar = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.app.user);

    return (
        <>
            <ListGroup defaultActiveKey="#link4">
                <ListGroup.Item action onClick={() => navigate('/chat')} href="#link4">
                    Chat
                </ListGroup.Item>
                {user.role !== 'ADMIN' && (
                    <ListGroup.Item action onClick={() => navigate('/kanban')} href="#link1">
                        Kanban
                    </ListGroup.Item>
                )}
                {(user.role === 'MANAGER' || user.role === 'DEVELOPER') && (
                    <ListGroup.Item action onClick={() => navigate('/tasks')} href="#link2">
                        Tasks
                    </ListGroup.Item>
                )}
                {user.role === 'ADMIN' && (
                    <ListGroup.Item action onClick={() => navigate('/admin')} href="#link3">
                        Admin panel
                    </ListGroup.Item>
                )}
                <ListGroup.Item action onClick={() => logout()} href="#link5">
                    Logout
                </ListGroup.Item>
            </ListGroup>
        </>
    );
};

export default NavBar;
