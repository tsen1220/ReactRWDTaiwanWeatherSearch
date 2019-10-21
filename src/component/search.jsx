import React, { Component } from "react";
import "../assets/search.css";

import axios from "axios";

class Search extends Component {
  state = {
    location: []
  };

  getLocation() {
    axios
      .get(
        "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-9BB00642-BB6E-4B27-BD5F-58DAD19EA057&format=JSON"
      )
      .then(res => {
        for (let i = 0; i < res.data.records.location.length; i++) {
          var location = res.data.records.location[i].locationName;

          this.setState({
            location: [...this.state.location, [location]]
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  componentDidMount() {
    this.getLocation();
  }

  render() {
    const option = this.state.location.map((locate, index) => {
      var link = "/" + locate;
      return (
        <option key={index} value={link}>
          {locate}
        </option>
      );
    });

    return (
      <div className="search position ">
        <h1 className="ti">天氣查詢</h1>
        <select id="taiwan" onChange={this.props.evt}>
          <option></option>
          <option value="/">全部縣市</option>
          {option}
        </select>
      </div>
    );
  }
}
export default Search;
