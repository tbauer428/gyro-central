import React from "react";
import { Header, Button } from "semantic-ui-react";

const Welcome = ({ addOrder }) => (
  <div className="landing-page-container">
    <div className="landing-page">
      <Header className="welcome-header" size="huge">
        Welcome to Gyro Central
      </Header>
      <Button primary onClick={e => addOrder()}>
        Start
      </Button>
      <Header className="welcome-header" size="huge">
        Locations go here
      </Header>
    </div>
  </div>
);

export default Welcome;
