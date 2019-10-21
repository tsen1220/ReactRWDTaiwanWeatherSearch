import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";
import Finddata from "./component/finddata";

function App() {
  return (
    <div>
      <Router>
        <Finddata />
        <BaseRouter />
      </Router>
    </div>
  );
}

export default App;
