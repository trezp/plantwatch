import React, { Component } from 'react';


function get() {
  return fetch(`/api/plants`, {
    accept: "application/json"
  })
  .then(response => response.json())
  .catch(err => console.log(err));
}

function postNewPlant(data){
  return fetch(`/api/plants`, {
    method: "POST", 
    mode: "cors",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .catch(err => console.log(err));
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: [],
      newPlant: null,
      image: ""
    }
  }
  handleSelectedFile = (event) => {
    this.setState({
      image: event.target.files[0]
    });
  }

  handleUpload = (event) => {
    event.preventDefault();
    
    this.setState({
      newPlant: {
        name: event.target[0].value, 
        type: event.target[1].value,
        waterFrequency: event.target[2].value, 
        lastWatered: event.target[3].value
      }
    });
    postNewPlant(this.state.newPlant);
  }
  componentDidMount(){
    get().then(result => this.setState({plants: result}));
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.plants.map(plant => 
            <li key={plant.id}>
              <img src={plant.image} alt={plant.type}/>
              <h2>{plant.name}</h2>
              <h3>{plant.type}</h3>
              <p>Water Frequency: {plant.waterFrequency}</p>
            </li>)}
        </ul>
        <form action="/api/plants" method="post" onSubmit={this.handleUpload} encType="multipart/form-data">
          Name:<input type="text" name="name"/>
          Type: <input type="text" name="plantType"/>
          Water Frequency: <input type="text" name="waterFrequency"/>
          Last Watered: <input type="text" name="lastWatered"/>
          <input type="file" name="photo" onChange={this.handleSelectedFile} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
