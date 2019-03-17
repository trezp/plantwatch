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

    const formData = new FormData(); 
    formData.append("name", event.target[0].value);
    formData.append("type", event.target[1].value);
    formData.append("avatar", this.state.image); 
    formData.append("waterFrequency", event.target[2].value);
    formData.append("lastWatered", event.target[3].value);


    fetch(`/api/plants`, {
      method: "POST", 
      mode: "cors",
      body: formData
    })
    .then(response => console.log(response))
    .catch(err => console.log(err));
  }
  componentDidMount(){
    get().then(result => this.setState({plants: result}));
  }

  render() {
    return (
      <div className="container">
        <ul className="plant-gallery columns">
          {this.state.plants.map(plant => 
            <li key={plant.id} className="plant column">
                <img src={plant.image} alt={plant.type}/>
              <h2>{plant.name}</h2>
              <h3>{plant.type}</h3>
              <p>Water Frequency: {plant.waterFrequency}</p>
            </li>)}
        </ul>
        <form className="add-plant control" action="/api/plants" method="post" onSubmit={this.handleUpload} encType="multipart/form-data">
          Name:<input className="input" type="text" name="name"/>
          Type: <input className="input" type="text" name="plantType"/>
          Water Frequency: <input className="input" type="text" name="waterFrequency"/>
          Last Watered: <input className="input" type="text" name="lastWatered"/>
          <input type="file" name="avatar" onChange={this.handleSelectedFile} />
          <button className="button is-primary" type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
