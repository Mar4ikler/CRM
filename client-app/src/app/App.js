import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginView from '../views/LoginView/LoginView';
import Layout from '../components/Layout/Layout';
import AdminView from '../views/AdminView/AdminView';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route element={<LoginView />} path="/login" />
                    <Route element={<Layout />} path="/">
                        <Route element={<AdminView />} path="admin" />
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
