import React, { Component } from 'react';

class Plants extends Component {
  render(){
    return (
      <ul className="plant-gallery columns">
        {this.props.plants.map(plant => 
          <li key={plant.id} className="plant column">
              <img src={plant.image} alt={plant.type}/>
            <h2>{plant.name}</h2>
            <h3>{plant.type}</h3>
            <p>Water Frequency: {plant.waterFrequency}</p>
          </li>)}
      </ul>
    )
  }
}


export default Plants;