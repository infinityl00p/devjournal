import React, { Component } from 'react';
import { entries } from './entries'

import JournalPage from './JournalPage';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <JournalPage Entries={entries}/>
      </div>
    );
  }
}
