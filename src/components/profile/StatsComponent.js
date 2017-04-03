import React, { Component } from 'react';

export default class StatsComponent extends Component {
    render(){
      return(
        <div className="col-md-4" id="stats">
          <div id="stats-count">
            {this.props.count}
          </div>
          <p>{this.props.name}</p>
        </div>
      )
    };
}
