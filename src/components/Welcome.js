import React from "react";
import { Header, Button } from "semantic-ui-react";
import { LocationData } from '../data/LocationData';
import LocationCard from './LocationCard';

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
        Locations Near You
      </Header>
      <div className="location-card-container">
      {
        LocationData.map(location => 
          <LocationCard location={location} />
        )
      }
      </div>
    </div>
  </div>
);

export default Welcome;
