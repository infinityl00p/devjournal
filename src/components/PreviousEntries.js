import React, { Component } from 'react';
import Entry from './Entry';

// TODO: this should be called EntryList
export default class PreviousEntries extends Component {
  constructor(props){
    super(props);

    this.appendEntries = this.appendEntries.bind(this);
  }

  appendEntries(){
    var sortedEntries = [];

    if (this.props.entries.length == 0){
      sortedEntries.push(
        <h1 className='empty-array'>Nothing to show!</h1>
      )
    }
    //this should push each entry from newest to oldest based on array size
    else {
      for (var i = this.props.entries.length - 1; i >= 0; i--){
        sortedEntries.push(
          <Entry key={i} data={this.props.entries[i]} />
        );
      }
    }
    return sortedEntries;
  }

  render(){
    return(
      <div className="previous-entries">
        {this.appendEntries()}
       </div>
    )
  }
}
