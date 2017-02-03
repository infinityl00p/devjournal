import React, { Component } from 'react';
import EntryBox from './EntryBox';
import PreviousEntries from './PreviousEntries';

export default class JournalPage extends Component {
  constructor(props){
    super(props);
  }

  
  render(){
    return(
      <div className='entry-box-wrapper'>
        <EntryBox />
        <PreviousEntries entries={this.props.Entries}/>
      </div>
    )
  }
}
