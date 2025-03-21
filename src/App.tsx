import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Board from "./componets/Organisms/Board/Board";
import AddTask from "./pages/AddTaskPage";
import TaskDetails from "./pages/TaskDetails";
import { EmployeeProvider } from "./context/EmployeeContext";
import NavBar from "./componets/Organisms/NavBar/NavBar";

function App() {
  return (
    <EmployeeProvider>
      <Router>
        <div className="px-30">
          <NavBar />
          <Routes>
            <Route path="/" element={<Board />} />
            <Route path="/add-task" element={<AddTask />} />
            <Route path="/task/:id" element={<TaskDetails />} />
          </Routes>
        </div>
      </Router>
    </EmployeeProvider>
  );
}

export default App;
