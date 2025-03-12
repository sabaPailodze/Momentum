import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Board from "./componets/Organisms/Board/Board";
import AddTask from "./pages/AddTaskPage";
import TaskDetails from "./pages/TaskDetails";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Board />} />
          <Route path="add-task" element={<AddTask />} />
          <Route path="task/:id" element={<TaskDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
