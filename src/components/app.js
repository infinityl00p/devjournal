import React, { Component } from 'react';
// import { storeData } from './entries'

import JournalPage from './JournalPage';

export default class App extends Component {
  render() {
    return (
      <div className='wrapper'>
        <JournalPage />
      </div>
    );
  }
}
