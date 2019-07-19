import React from "react";
import { Progress } from "semantic-ui-react";
import { Header } from "semantic-ui-react";

class ProgressPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
      orderReady: false,
      statusMessages: {
        "0": "Getting started",
        "10": "Hercules is patting the pitas",
        "20": "Perseus is shaving the lamb",
        "30":
          "Dionysus is making sure the tomatoes are cut just a little too big",
        "40": "Ajax is yelling at Dionysus for his shoddy chopping",
        "50": "Castor is mixing the tzatziki",
        "60": "Pollux is quality checking the tzatziki",
        "70": "Theseus is shredding the lettuce",
        "80": "Adonis is working on the presentation",
        "90": "Agamemnon is assembling your gyro",
        "100": "Hermes is delivering your gyro"
      }
    };
  }

  intervalID = 0;

  increaseOrderProgress = () => {
    if (this.state.percent < 100) {
      this.setState({
        percent: this.state.percent + 10
      });
    } else {
      clearInterval(this.intervalID);
      this.setState({
        orderReady: true
      });
    }
  };

  componentDidMount = () => {
    this.intervalID = setInterval(this.increaseOrderProgress, 1000);
  };

  render() {
    return (
      <div className="Progress">
        <Header size="huge">Your order progress:</Header>
        <Progress indicating percent={this.state.percent} />
        <Header size="huge">
          Status: {this.state.statusMessages[this.state.percent.toString()]}
        </Header>
      </div>
    );
  }
}

export default ProgressPage;
