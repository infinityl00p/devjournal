import React, { Component } from 'react';
import DataVisual from './DataVisual';

//this component will be a container for controlling data
export default class Progress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
      {name: 'January', uv: 4000, pv: 2400, amt: 2400},
      {name: 'February', uv: 3000, pv: 1398, amt: 2210},
      {name: 'March', uv: 2000, pv: 9800, amt: 2290},
      {name: 'April', uv: 2780, pv: 3908, amt: 2000},
      {name: 'May', uv: 1890, pv: 4800, amt: 2181},
      {name: 'June', uv: 2390, pv: 3800, amt: 2500},
      {name: 'July', uv: 3490, pv: 4300, amt: 2100},
      ]
    }
  }

  render() {
    return(
      <div>
        <p> This {this.props.activeComponent} </p>
        <DataVisual data={this.state.data}/>
      </div>
    )
  }
}
