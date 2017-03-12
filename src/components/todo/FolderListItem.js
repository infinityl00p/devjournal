import React, { Component } from 'react';

export default class FolderLisItem extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.text);
  }

  render() {
    return(
      <div onClick={this.handleClick} className={this.props.isActive ? "folder-list-item active" : "folder-list-item"} >
        <span className={"glyphicon " + this.props.icon} />
        <p>{this.props.text}</p>
        <span className="counter">{this.props.count}</span>
      </div>
    );
  }
}