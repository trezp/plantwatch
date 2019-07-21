import React, { Component } from 'react';
import Plants from './components/Plants/Plants';
import AddPlant from './components/AddPlant/AddPlant';
import Header from './components/Header/Header'


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
        <Header title="PlantSitter"></Header>
        <Plants plants={this.state.plants}/>
        <Header title="Add a New Plant"></Header>
        <AddPlant handleUpload={this.handleUpload} handleSelectedFile={this.handleSelectedFile}/>
      </div>
    );
  }
}

export default App;
