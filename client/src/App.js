import React, { Component } from 'react';


function get() {
  return fetch(`/something`, {
    accept: "application/json"
  })
  .then(response => response.json())
  .catch(err => console.log(err));
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    }
  }

  componentDidMount(){
    get().then(result => this.setState({message: result.message}));
  }

  render() {
    return (
      <p>
        {this.state.message}
      </p>
    );
  }
}

export default App;
