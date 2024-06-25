import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginView from '../views/LoginView/LoginView';
import Layout from '../components/Layout/Layout';
import AdminView from '../views/AdminView/AdminView';
import TasksView from '../views/TasksView/TasksView';
import TaskView from '../views/TaskView/TaskView';
import KanbanView from '../views/KanbanView/KanbanView';
import './App.css';
import ChatView from '../views/ChatView/ChatView';

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
                        <Route element={<KanbanView />} path="kanban" />
                        <Route element={<ChatView />} path="chat" />
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
