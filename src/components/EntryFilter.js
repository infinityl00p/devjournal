import React, { Component } from 'react';
import Tag from './Tag';

export default class EntryFilter extends Component {
  constructor(props) {
    super(props);

    this.renderTags = this.renderTags.bind(this);

    // TODO: for rendering EntryList
    this.state = {
      entries: this.props.entries
    }
  }

  renderTags() {
    var tags = this.props.tags.map((tag) => {
      return(
          <li><Tag key={tag.id} data={tag}/></li>
      );
    });

    return tags;
  }

  filterEntries(tag) {
    // TODO: for rendering EntryList
  }

  render() {
      return(
        <div id="entry-filter">
          <ul>{this.renderTags()}</ul>
        </div>
      );
  }
}