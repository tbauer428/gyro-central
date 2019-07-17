import React from "react";

const LandingPage = ({ addOrder }) => (
  <div className="LandingPage">
    <div className="header">Welcome to Gyro Central</div>
    <div onClick={e => addOrder()}>Start</div>
    <div>Locations go here</div>
  </div>
);

export default LandingPage;
