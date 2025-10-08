import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AssessmentApp from "./components/assessment/AssessmentApp";
import AdminPage from "./components/admin/AdminPage";
import LoginPage from "./components/commons/LoginPage";
import "./index.css"; // Your global styles

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Main assessment routes */}
          <Route path="/" element={<AssessmentApp />} />
          
          {/* Login route */}
          <Route 
            path="/login" 
            element={<LoginPage />} 
          />
          
          {/* Protected Admin route */}
          <Route 
            path="/admin" 
            element={<AdminPage />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
