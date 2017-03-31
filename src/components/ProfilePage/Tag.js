import React, { Component } from 'react';

export default class Tag extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <li className="list-group-item tag-list-item" key={this.props.id}>
        {this.props.id}
        <span className="frequency">
          {this.props.frequency}
        </span>
      </li>
    )
  }
}
