import React, { Component } from 'react';
import EntryBox from './EntryBox';
import PreviousEntries from './PreviousEntries';

export default class JournalPage extends Component {
  constructor(props){
    super(props);

    this.renderEntries = this.renderEntries.bind(this);

    this.state = {
      entries: this.props.Entries
    }
  }

  renderEntries(entryObject){
    var updatedEntries = this.state.entries.slice();
    updatedEntries.push(entryObject);
    this.setState({
      entries: updatedEntries
    })
    console.log(this.state);
  }

  render(){
    return(
      <div className='journal-page-wrapper'>
        <div className='sidebar-wrapper'>
        </div>
        <div className='entry-box-wrapper'>
          <EntryBox renderEntries={this.renderEntries}/>
        </div>
        <div className='previous-entries-wrapper'>
          <PreviousEntries entries={this.state.entries}/>
        </div>
      </div>
    )
  }
}
