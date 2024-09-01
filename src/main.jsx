import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Home } from "./pages/Home.jsx";
import { Convert } from "./pages/Convert.jsx";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="convert" element={<Convert />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
