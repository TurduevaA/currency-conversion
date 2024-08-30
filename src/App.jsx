import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Convert from "./pages/Convert";

const App = () => {
  const [baseCurrency, setBaseCurrency] = useState("RUB");

  return (
    <Router>
      <Header baseCurrency={baseCurrency} setBaseCurrency={setBaseCurrency} />
      <Routes>
        <Route path="/" element={<Home baseCurrency={baseCurrency} />} />
        <Route
          path="/convert"
          element={<Convert baseCurrency={baseCurrency} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
