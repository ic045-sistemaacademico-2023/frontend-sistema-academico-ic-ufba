import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/Login";
import StudentPage from "./pages/Student";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/" element={<StudentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
