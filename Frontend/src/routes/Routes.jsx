import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LandingPage from "../pages/landingpage";
import Registration from "../pages/registration";
import Login from "../pages/login";
import NotesApp from "../pages/home"
const Loading = () => <div>Loading...</div>;

export default function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <AppRoutes />
      </Suspense>
    </Router>
  );
}

// Define AppRoutes
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<NotesApp />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}
