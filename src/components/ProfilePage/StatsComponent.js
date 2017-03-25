import React, { Component } from 'react';

export default class StatsComponent extends Component {
    constructor(props) {
      super(props);
    }
    render(){
      return(
        <div className="col-md-4">
          <p>{this.props.name}</p>
          <div id="stats-count">
            {this.props.count}
          </div>
        </div>
      )
    };
}
