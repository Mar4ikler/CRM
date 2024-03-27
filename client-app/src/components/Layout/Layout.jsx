import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import NavBar from '../NavBar/NavBar';

const Layout = () => {
    return (
        <div className={styles.contentContainer}>
            <NavBar />
            <Outlet />
        </div>
    );
};

export default Layout;
