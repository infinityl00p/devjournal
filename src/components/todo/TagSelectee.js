import React, { Component } from 'react';

export default class TagSelectee extends Component {
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
        className={this.props.isActive ? 'tag active' : 'tag'}
        onClick={this.onClick}
      >
        {this.props.text}
      </span>
    );
  }
}