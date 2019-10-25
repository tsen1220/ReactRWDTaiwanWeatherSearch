import React, { Component } from "react";
import axios from "axios";
import "../assets/search.css";
import Box from "./box";

class Detail extends Component {
  state = {
    location: [],
    startTime: [],
    endTime: [],
    temperature: [],
    rain: [],
    Condition: [],
    url: this.props.match.params.value
  };

  getWeatherData() {
    axios
      .get(
        "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-9BB00642-BB6E-4B27-BD5F-58DAD19EA057&format=JSON"
      )
      .then(res => {
        var date = new Date();
        var today = date.getDate();
        var weatherDateStart = parseInt(
          res.data.records.location[0].weatherElement[2].time[0].startTime.slice(
            8,
            10
          )
        );
        var weatherDateEnd = parseInt(
          res.data.records.location[0].weatherElement[2].time[0].endTime.slice(
            8,
            10
          )
        );
        for (let i = 0; i < res.data.records.location.length; i++) {
          var location = res.data.records.location[i].locationName;
          //1
          if (location === this.state.url) {
            if (today === weatherDateEnd) {
              var weatherTimeStart =
                "今日" +
                parseInt(
                  res.data.records.location[
                    i
                  ].weatherElement[2].time[0].startTime.slice(11, 13)
                ) +
                ":00";
              var weatherTimeEnd =
                "今日" +
                parseInt(
                  res.data.records.location[
                    i
                  ].weatherElement[2].time[0].endTime.slice(11, 13)
                ) +
                ":00";

              var temperature =
                res.data.records.location[i].weatherElement[2].time[0].parameter
                  .parameterName +
                " " +
                res.data.records.location[i].weatherElement[2].time[0].parameter
                  .parameterUnit;
              var rain =
                res.data.records.location[i].weatherElement[1].time[0].parameter
                  .parameterName + " %";

              var weatherCondition =
                res.data.records.location[i].weatherElement[0].time[0].parameter
                  .parameterName;
            } else if (today !== weatherDateEnd) {
              var weatherTimeStart =
                "今日" +
                parseInt(
                  res.data.records.location[
                    i
                  ].weatherElement[2].time[0].startTime.slice(11, 13)
                ) +
                ":00";
              var weatherTimeEnd =
                "明日" +
                parseInt(
                  res.data.records.location[
                    i
                  ].weatherElement[2].time[0].endTime.slice(11, 13)
                ) +
                ":00";

              var temperature =
                res.data.records.location[i].weatherElement[2].time[0].parameter
                  .parameterName +
                " " +
                res.data.records.location[i].weatherElement[2].time[0].parameter
                  .parameterUnit;
              var rain =
                res.data.records.location[i].weatherElement[1].time[0].parameter
                  .parameterName + " %";

              var weatherCondition =
                res.data.records.location[i].weatherElement[0].time[0].parameter
                  .parameterName;
            }

            this.setState({
              location: [...this.state.location, [location]],
              startTime: [...this.state.startTime, [weatherTimeStart]],
              endTime: [...this.state.endTime, [weatherTimeEnd]],
              temperature: [...this.state.temperature, [temperature]],
              rain: [...this.state.rain, [rain]],
              Condition: [...this.state.Condition, [weatherCondition]]
            });
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  componentDidMount() {
    this.getWeatherData();
    setInterval(() => {
      this.getWeatherData();
    }, 21600000);
  }

  render() {
    const location = this.state.location.map((locate, index) => {
      return (
        <Box
          key={index}
          location={this.state.location[index]}
          start={this.state.startTime[index]}
          end={this.state.endTime[index]}
          temperature={this.state.temperature[index]}
          rain={this.state.rain[index]}
          condition={this.state.Condition[index]}
        />
      );
    });

    return <div className="detail1">{location}</div>;
  }
}

export default Detail;
