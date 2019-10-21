import React from "react";
import { Route } from "react-router-dom";
import Data from "./component/index";
import Detail from "./component/detail";

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={Data} />
    <Route exact path="/:value" component={Detail} />
  </div>
);

export default BaseRouter;
