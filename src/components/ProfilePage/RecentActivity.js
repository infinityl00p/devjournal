import React, { Component } from 'react';

export default class RecentActivity extends Component {
  constructor(props) {
    super(props);

    this.renderEntries = this.renderEntries.bind(this);
  }

  renderEntries() {
    var entryArray=[]
    for (var i=0; i < 5; i++){
      entryArray.push(<p>{this.props.data.entries[i].entryText}</p>);
    }
    return entryArray;
  }
  render() {
    return(
      <div>
        {this.renderEntries()}
      </div>
    )
  }
}
