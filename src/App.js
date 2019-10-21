import React from "react";
import "./assets/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";
import Finddata from "./component/finddata";

function App() {
  return (
    <div className="back">
      <Router>
        <Finddata />
        <BaseRouter />
      </Router>
    </div>
  );
}

export default App;
