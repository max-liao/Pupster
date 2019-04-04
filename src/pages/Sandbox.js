import React, { Component } from "react";
import API from "../utils/API"
import Container from "../components/Container";
import Alert from "../components/Alert";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";

class Sandbox extends Component {
  state = {
    search: "",
    breed: [],
    allbreeds: [],
    result: [],
    error: "Test Error"
  };

  // When the component mounts, get a list of all available base breeds and update this.state.breeds
  componentDidMount() {
    API.getBaseBreedsList()
      .then(res => this.setState({allbreeds: res.data.message}))
      .catch(err => this.setState({error: err.message}));
  }

  handleInputChange = event => {
    this.setState({ search: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.setState({ breed: this.state.search});
    API.getDogsOfBreed(this.state.search)
      .then(res =>{
        var randomDog = Math.floor(Math.random() * res.data.message.length);
        var newResults = this.state.result.concat(res.data.message[randomDog]);
        this.setState({ result: newResults });
        console.log( this.state.result);
      })
      .catch(err => this.setState({error: err.message}));    
  };
  
  render() {
    return (
      <div>
        <Container style={{ minHeight: "80%" }}>
          <h1 className="text-center">Find a pup by breed!</h1>
          <Alert type="danger" style={{ opacity: this.state.err ? 1 : 0, marginBottom: 10 }}>
            {this.state.err}
          </Alert>
          <SearchForm
            handleFormSubmit={this.handleFormSubmit}
            handleInputChange={this.handleInputChange}
            breeds={this.state.allbreeds}
            buttonText = "Add Pup"
          />
          <SearchResults results={this.state.result} />
        </Container>
      </div>
    );
  };
}

export default Sandbox;
