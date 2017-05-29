import React, { Component } from 'react';

export default class SimpleListTags extends Component {
  constructor() {
    super();

    this.renderTags = this.renderTags.bind(this);
  }

  renderTags() {

  }

  render() {
    return(
      <div id="simple-list-tags">
        {this.renderTags()}
      </div>
    );
  }
}