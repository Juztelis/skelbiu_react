import Login from "./components/Login.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register.jsx";
import Skelbimai from "./components/Skelbimai.jsx";

const isLoggedIn = () => Boolean(localStorage.getItem("token"));

const ProtectedRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isLoggedIn() ? <Navigate to="/skelbimai" replace /> : <Login />
          }
        />
        <Route
          path="/register"
          element={
            isLoggedIn() ? <Navigate to="/skelbimai" replace /> : <Register />
          }
        />
        <Route
          path="/skelbimai"
          element={
            <ProtectedRoute>
              <Skelbimai />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
