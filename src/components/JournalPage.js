import React, { Component } from 'react';
import EntryForm from './EntryForm';
import EntryList from './EntryList';
// import Sidebar from './Sidebar';

export default class JournalPage extends Component {
  constructor(props) {
    super(props);

    this.renderEntries = this.renderEntries.bind(this);

    this.state = {
      entries: this.props.data.entries,
      tags: this.props.data.tags
    }
  }

  renderEntries(entryObject){
    var updatedEntries = this.state.entries.slice();
    updatedEntries.push(entryObject);
    this.setState({
      entries: updatedEntries
    });
    // call backend
  }

  render(){
    return(
      <div id='journal-page-container'>
        { /*
          TODO: This needs to be a container component
         */ }
        <div id='sidebar-container'>
          <ul className='sidebar-nav'>
            <li>
              <div className='entry-form-container'>
                <EntryForm renderEntries={this.renderEntries}/>
              </div>
            </li>
            <div className="category-container">
              { /* <Sidebar entries={this.state.entries}/> */ }
            </div>
          </ul>
        </div>
        { /*
          TODO: This needs to be cleaned up, some of it is superfluous
         */ }
        <div className='page-content-container'>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className='entry-list-container'>
                  <EntryList entries={this.state.entries} tags={this.state.tags} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
