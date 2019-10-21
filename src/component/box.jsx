import React from "react";
import "../assets/box.css";

const Box = props => {
  return (
    <div className="box">
      <div className="title">
        <span className="locat">{props.location}</span>{" "}
        <span className="time">{props.start}~</span>
        <span className="time">{props.end}</span>
      </div>{" "}
      <div className="content">
        <span className="cond">天氣狀況:{props.condition}</span>
        <br />
        <span className="temp">氣溫:{props.temperature}</span>
        <br />
        <span className="rain">降雨機率:{props.rain}</span>
        <br />
      </div>
    </div>
  );
};
export default Box;
