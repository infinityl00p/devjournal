import React, {Component} from 'react';

export default class FilterTag extends Component {
  constructor(props) {
    super(props);

    this.toggleActive = this.toggleActive.bind(this);

    this.state = {
      active: false
    }
  }

  componentWillReceiveProps() {
    this.setState({
      active: this.props.active(this.props.id)
    });
  }

  toggleActive() {
    this.props.onClick(this.props.id);
  }

  render() {
    return(
        <span onClick={this.toggleActive} className={this.state.active ? "filter-tag active" : "filter-tag"}>
          {this.props.data.tagText}
        </span>
    );
  }
}

React.propTypes = {
  data: React.PropTypes.object,
  id: React.PropTypes.number,
  onClick: React.PropTypes.func,
  active: React.PropTypes.bool
}
