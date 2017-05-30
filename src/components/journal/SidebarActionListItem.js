import React, { Component } from 'react';


export default class SidebarActionListItem extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.type);
  }

  render() {
    return(
      <div onClick={this.handleClick} className="action-list-item active" >
        <span className={"glyphicon " + this.props.icon} />
        <p>{this.props.text}</p>
      </div>
    );
  }
}