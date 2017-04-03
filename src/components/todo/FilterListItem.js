import React, { Component } from 'react';

export default class FilterListItem extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      isActive: this.props.isActive
    }
  }

  handleClick() {
    this.setState({ isActive: !this.state.isActive }, function() {
      this.props.onClick(this.props.id, this.state.isActive);
    });
  }

  render() {
    return(
      <div className={this.props.isActive ? "filter-list-item active" : "filter-list-item"} onClick={this.handleClick}>
        <span className={"glyphicon " + this.props.icon} />
        <p>{this.props.text}</p>
      </div>
    );
  }
}