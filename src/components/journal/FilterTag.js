import React, {Component} from 'react';

export default class FilterTag extends Component {
  constructor(props) {
    super(props);

    this.updateFilter = this.updateFilter.bind(this);

    this.state = {
      active: false
    }
  }

  componentWillReceiveProps() {
    this.setState({
      active: this.props.active(this.props.id)
    });
  }

  updateFilter() {
    this.props.onSelect(this.props.id);
  }

  render() {
    return(
        <span onClick={this.updateFilter} className={this.state.active ? "filter-tag active" : "filter-tag"}>
          <span className={"glyphicon " + this.props.icon} />
          <p>{this.props.data.tagText}</p>
        </span>
    );
  }
}

React.propTypes = {
  data: React.PropTypes.object,
  id: React.PropTypes.number,
  onSelect: React.PropTypes.func,
  active: React.PropTypes.bool
}
