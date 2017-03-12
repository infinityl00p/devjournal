import React, { Component } from 'react';

export default class StatsBarItem extends Component {
  constructor(props) {
    super(props);

    this.handleClick=this.handleClick.bind(this);

    this.state = {
      active: this.props.isActive
    }
  }

    handleClick() {
      this.setState({
        active: true
      });
      this.props.onClick();
    }
  render(){
    var classNames = "stats-bar-item " + (this.props.isActive ? "active" : "");
    return(
      <div className={classNames} onClick={this.handleClick}>
        <span className={"glyphicon " + this.props.icon} />
        <p>{this.props.name}</p>
      </div>
    )
  }
}
