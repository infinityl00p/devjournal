import React, { Component } from 'react';

export default class SimpleList extends Component {
  /*
      LIST FUNCTIONALITY:
        - Displays SimpleListItems
        - Groups Items by: Day, Week, Month
        - Displays tags by colour with a legend at the top
  */
  constructor() {
    super();

    this.renderSimpleList = this.renderSimpleList.bind(this);
  }

  renderSimpleList() {
    // map entries into SimpleListItems
  }

  render() {
    return(
      <div id="entry-view-simple-list">
          {this.renderSimpleList()}
      </div>
    );
  }
}