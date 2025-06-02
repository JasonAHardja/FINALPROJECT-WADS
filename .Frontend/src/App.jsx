import React from "react";
import Landing from "./components/Landing";
import Register from "./components/Register"
import Login from "./components/Login";
import VerifyEmail from "./components/VerifyEmail";
import TicketSystem from "./components/TicketSystem";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tickets" element={<TicketSystem />} />
        <Route path="/activation/:token" element={<VerifyEmail />} />
      </Routes>
    </Router>
  );
}
