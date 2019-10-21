import React, { Component } from "react";

import Search from "./search";

class Finddata extends Component {
  handleChange() {
    var taiwan = document.getElementById("taiwan");
    var value = taiwan.value;
    window.location.pathname = value;
  }

  render() {
    return (
      <div>
        <Search evt={this.handleChange} />
      </div>
    );
  }
}
export default Finddata;
