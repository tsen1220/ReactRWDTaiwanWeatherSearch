import React, { Component } from "react";
import Box from "../component/box";
import axios from "axios";

class Data extends Component {
  state = {
    location: [],
    startTime: [],
    endTime: [],
    temperature: [],
    rain: [],
    Condition: []
  };

  getWeatherData() {
    axios
      .get(
        "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-9BB00642-BB6E-4B27-BD5F-58DAD19EA057&format=JSON"
      )
      .then(res => {
        // //2為溫度 0為氣象狀況 1為降雨
        // console.log(res.data.records.location[i].weatherElement[2].time);
        // console.log(res.data.records.location[i].weatherElement[1].time);
        // console.log(res.data.records.location[i].weatherElement[0].time);
        // console.log(res.data.records.location[i].locationName);
        var date = new Date();
        var today = date.getDate();
        var time = date.getHours();

        for (let i = 0; i < res.data.records.location.length; i++) {
          var weatherDate = parseInt(
            res.data.records.location[
              i
            ].weatherElement[2].time[0].startTime.slice(8, 10)
          );

          //1
          if (12 < time && time < 18 && today === weatherDate) {
            var location = res.data.records.location[i].locationName;

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
          }

          //2
          if ((18 < time || time < 6) && today === weatherDate) {
            var location = res.data.records.location[i].locationName;
            var weatherTimeStart =
              "今日" +
              parseInt(
                res.data.records.location[
                  i
                ].weatherElement[2].time[1].startTime.slice(11, 13)
              ) +
              ":00";
            var weatherTimeEnd =
              "明日" +
              parseInt(
                res.data.records.location[
                  i
                ].weatherElement[2].time[1].endTime.slice(11, 13)
              ) +
              ":00";
            var temperature =
              res.data.records.location[i].weatherElement[2].time[1].parameter
                .parameterName +
              " " +
              res.data.records.location[i].weatherElement[2].time[1].parameter
                .parameterUnit;

            var rain =
              res.data.records.location[i].weatherElement[1].time[1].parameter
                .parameterName + " %";

            var weatherCondition =
              res.data.records.location[i].weatherElement[0].time[1].parameter
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
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getWeatherData();
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

    return <div>{location}</div>;
  }
}

export default Data;
