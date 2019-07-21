import React, {Component} from 'react';

class AddPlant extends Component {
  render(){
    return(
      <form className="add-plant control" action="/api/plants" method="post" onSubmit={this.props.handleUpload} encType="multipart/form-data">
        Name:<input className="input" type="text" name="name"/>
        Type: <input className="input" type="text" name="plantType"/>
        Water Frequency: <input className="input" type="text" name="waterFrequency"/>
        Last Watered: <input className="input" type="text" name="lastWatered"/>
        <input type="file" name="avatar" onChange={this.props.handleSelectedFile} />
        <button className="button is-primary" type="submit">Submit</button>
      </form>
    )
  }
}

export default AddPlant