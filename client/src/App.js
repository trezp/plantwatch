import React, { Component } from 'react';


function get() {
  return fetch(`/api/plants`, {
    accept: "application/json"
  })
  .then(response => response.json())
  .catch(err => console.log(err));
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: []
    }
  }

  componentDidMount(){
    get().then(result => this.setState({plants: result}));
  }

  render() {
    return (
      <ul>
        {this.state.plants.map(plant => 
          <li>
            <img src={plant.image} alt={plant.type}/>
            <h2>{plant.name}</h2>
            <h3>{plant.type}</h3>
            <p>Water Frequency: {plant.waterFrequency}</p>
          </li>)}
      </ul>
    );
  }
}

export default App;
