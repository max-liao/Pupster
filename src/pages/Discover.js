import React, { Component } from "react";
import API from "../utils/API";
import Card from "../components/Card";
import Alert from "../components/Alert";

class Discover extends Component {
  state = {
    image: "",
    match: false,
    matchCount: 0,
    matchMessage: "",
    showAlert: false
  };

  // When the component mounts, load the next dog to be displayed
  componentDidMount() {
    this.loadNextDog();
  }

  handleBtnClick = event => {    
    // Get the data-value of the clicked button
    const btnType = event.target.attributes.getNamedItem("data-value").value;
    // Clone this.state to the newState object
    // We'll modify this object and use it to set our component's state
    const newState = { ...this.state };


    if (btnType === "pick") {
      // Set newState.match to either true or false depending on whether or not the dog likes us (1/2 chance)
      newState.match = 1; // === Math.floor(Math.random() * 2) + 1;
      // Set newState.matchCount equal to its current value or its current value + 1 depending on whether the dog likes us
      newState.matchCount = newState.match
        ? newState.matchCount + 1
        : newState.matchCount;
    } else {
      // If we thumbs down'ed the dog, we haven't matched with it
      newState.match = false;
    }

    if (newState.match === 1){
      newState.matchMessage = "Yay! New Frens!";    
    }
    else {
      newState.matchMessage = "No Fren!";    
    }
    newState.showAlert = true;

    this.setState(newState);

    setTimeout( this.setAlert() , 1000);

    // Replace our component's state with newState, load the next dog image
    this.loadNextDog();
  };

  setAlert(){
    setTimeout(
      function() {
          this.setState({showAlert: false});
      }
      .bind(this),
      3000
    );
  }

  loadNextDog = () => {
    API.getRandomDog()
      .then(res =>
        this.setState({
          image: res.data.message
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <h1 className="text-center">Make New Friends</h1>
        <h3 className="text-center">
          Thumbs up on any pups you'd like to meet!
        </h3>
        <Alert type={this.state.match ? "success": "danger"} style={{display: this.state.showAlert ? "block" : "none"}} >
          {this.state.matchMessage}
        </Alert>
        <Card image={this.state.image} handleBtnClick={this.handleBtnClick} />
        <h1 className="text-center">
          Made friends with {this.state.matchCount} pups so far!
        </h1>
      </div>
    );
  }
}

export default Discover;
