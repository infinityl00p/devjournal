import React, { Component } from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

export default class DataVisual extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="linechart">
        <LineChart className="line-chart" width={500} height={250} data={this.props.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
    )
  }
}
