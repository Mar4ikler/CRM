import { ListGroup } from 'react-bootstrap';
import styles from './NavBar.module.css';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../helpers/logout';

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <>
            <ListGroup defaultActiveKey="#link1">
                <ListGroup.Item action href="#link1">
                    Canban
                </ListGroup.Item>
                <ListGroup.Item action onClick={() => navigate('/admin')} href="#link2">
                    Admin panel
                </ListGroup.Item>
                <ListGroup.Item action onClick={() => logout()} href="#link3">
                    Logout
                </ListGroup.Item>
            </ListGroup>
        </>
    );
};

export default NavBar;
