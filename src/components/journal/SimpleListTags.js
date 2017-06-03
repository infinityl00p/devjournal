import React, { Component } from 'react';

import SimpleListTagsItem from './SimpleListTagsItem';

export default class SimpleListTags extends Component {
  constructor() {
    super();

    this.renderTags = this.renderTags.bind(this);
  }

  renderTags() {
    return this.props.tags.map((tag) => {
      return <SimpleListTagsItem key={tag.id} id={tag.id} text={tag.tagText} />
    });
  }

  render() {
    return(
      <div className="simple-list-tags">
        {this.renderTags()}
      </div>
    );
  }
}