import React, { Component } from 'react';
import EntryBox from './EntryBox';
import EntryList from './EntryList';
import Sidebar from './Sidebar';

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
      <div id='wrapper'>
        <div id='sidebar-wrapper'>
          <ul className='sidebar-nav'>
            <li>
              <div className='entry-box-wrapper'>
                <EntryBox renderEntries={this.renderEntries}/>
              </div>
            </li>
            <div className="category-wrapper">
              <Sidebar entries={this.state.entries}/>
            </div>
          </ul>
        </div>
        {/* Page Content */}
        <div className='page-content-wrapper'>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className='entry-list-wrapper'>
                  <EntryList entries={this.state.entries}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
