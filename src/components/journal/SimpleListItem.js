import React, { Component } from 'react';

import SimpleListTags from './SimpleListTags';

export default class SimpleListItem extends Component {
  constructor() {
    super();

  }

  render() {
    return(
      <div className="simple-list-item">
        <div className="entry">
          <span classname="entry-title">
            {this.props.title}
          </span>
          <span className="entry-text">
            {this.props.text}
          </span>
          <span className="entry-date">
            {this.props.date}
          </span>
          <span className="entry-tags">
            <SimpleListTags tags={this.props.tags} />
          </span>
        </div>
      </div>
    );
  }
}