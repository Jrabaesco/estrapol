import { useState } from "react";
import { createBrowserRouter, RouterProvider, Route, Navigate, Outlet } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Ballot from "./Ballot";
import TopicDetail from "./TopicDetail";
import ExamGenerator from "./ExamGenerator";
import ExamByTopic from "./ExamByTopic";
import GeneralExam from "./GeneralExam";
import ExamenGeneral from "./ExamenGeneral";
import CorrectErrors from "./CorrectErrors";
import Navbar from "./Navbar";
import Results from "./Results";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const authenticate = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  // Componente de rutas protegidas
  const ProtectedRoute = () => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
  };

  const router = createBrowserRouter([
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login authenticate={authenticate} /> },
    {
      element: <ProtectedRoute />, // Usa el componente de rutas protegidas
      children: [
        { path: "/dashboard", element: <Dashboard user={user} /> },
        { path: "/ballot", element: <Ballot user={user} /> },
        { path: "/topic/:id", element: <TopicDetail user={user} /> },
        { path: "/exam-generator", element: <ExamGenerator user={user} /> },
        { path: "/exam-by-topic/:topicId/:questionCount", element: <ExamByTopic user={user} /> },
        { path: "/general-exam", element: <GeneralExam user={user} /> },
        { path: "/examen-general", element: <ExamenGeneral user={user} /> },
        { path: "/correct-errors", element: <CorrectErrors user={user} /> },
        { path: "/results", element: <Results /> },
      ],
    },
  ]);

  return (
    <>
      {isAuthenticated && <Navbar logout={logout} />}
      <RouterProvider router={router} />
    </>
  );
};

export default App;