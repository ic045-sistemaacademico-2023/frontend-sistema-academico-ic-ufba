import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/Login";
import StudentPage from "./pages/Student";
import RegisterUser from "./pages/RegisterUser";
import PasswordReset from "./pages/PasswordReset";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<StudentPage />} />
        <Route exact path="/cadastro-usuario" element={<RegisterUser />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/password-reset" element={<PasswordReset />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
