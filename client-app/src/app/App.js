import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginView from "../views/LoginView/LoginView";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<LoginView />} path="/login" />
        </Routes>
      </Router>
    </>
  );
}

export default App;
