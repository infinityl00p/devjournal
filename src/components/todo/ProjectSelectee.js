import React, { Component } from 'react';

export default class ProjectSelectee extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);

    this.state = {
      isActive: this.props.isActive
    }
  }

  onClick() {
    this.setState({ isActive: !this.state.isActive }, function() {
      this.props.onClick(this.props.id, this.state.isActive);
    });
  }

  render() {
    return(
      <span
        className={this.props.isActive ? 'project active' : 'project'}
        onClick={this.onClick}
      >
        {this.props.text}
      </span>
    );
  }
}