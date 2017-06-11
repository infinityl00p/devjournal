import React, { Component } from 'react';

import SimpleListItem from './SimpleListItem';

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
    var entryItems = this.props.entries.map((entry) => {
      var tags = this.props.tags.filter(function (tag) {
        return _.contains(entry.tags, tag.id);
      });
      var text = entry.entryText;
      var props = {
        key: entry.id,
        entryText: text,
        text: text.substring(0, 70),
        tags: tags,
        // title: entry.title,
        date: entry.date,
        onClick: this.props.onClick
      };

      return <SimpleListItem {...props} />
    });

    return entryItems.reverse();
  }

  render() {
    return(
      <div id="entry-view-simple-list">
          {this.renderSimpleList()}
      </div>
    );
  }
}