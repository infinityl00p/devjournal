import React, { Component } from 'react';


export default class ActionBarItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      active: this.props.isActive
    }
  }

  handleClick() {
    this.setState({ active: true });
    this.props.onClick();
  }

  render() {
      return(
        <div
          className={this.props.isActive ? "action-bar-item active" : "action-bar-item"}
          onClick={this.handleClick}
        >
          <span className={"glyphicon " + this.props.icon} />
          <p>{this.props.text}</p>
        </div>
      );
  }
}

ActionBarItem.propTypes = {
  isActive: React.PropTypes.bool,
  text: React.PropTypes.string,
  icon: React.PropTypes.string,
  key: React.PropTypes.string,
  onClick: React.PropTypes.func
}
