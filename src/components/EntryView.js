import React, { Component } from 'react';

export default class EntryView extends Component {
  render() {
    return(
      <div className="col-md-8" id="entry-view">
        <h4 className="date-text">February 19, 2017, 8:39 PM</h4>
        <p className="entry-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      </div>
    );
  }
}