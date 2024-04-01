import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginView from '../views/LoginView/LoginView';
import Layout from '../components/Layout/Layout';
import AdminView from '../views/AdminView/AdminView';
import TasksView from '../views/TasksView/TasksView';
import TaskView from '../views/TaskView/TaskView';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route element={<LoginView />} path="/login" />
                    <Route element={<Layout />} path="/">
                        <Route element={<TasksView />} path="tasks" />
                        <Route element={<AdminView />} path="admin" />
                        <Route element={<TaskView />} path="task" />
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
