import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import EntryViewItem from './EntryViewItem';

export default class EntryViewList extends Component {
  constructor() {
      super();

      this.renderEntryList = this.renderEntryList.bind(this);
      this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeEntryId !== prevProps.activeEntryId) {
      this.ensureActiveItemVisible();
    }
  }

  ensureActiveItemVisible() {
    var entryItemComponent = this.refs.activeEntry;
    if (entryItemComponent) {
      var domNode = ReactDOM.findDOMNode(entryItemComponent);
      this.scrollElementIntoViewIfNeeded(domNode);
    }
  }

  scrollElementIntoViewIfNeeded(domNode) {
    var containerDomNode = ReactDOM.findDOMNode(this);
    containerDomNode.scrollTop = domNode.offsetTop - containerDomNode.offsetTop;
  }

  renderEntryList() {
    var entryItems = this.props.entries.map((entry) => {
      var tags = this.props.tags.filter(function (tag) {
        return _.contains(entry.tags, tag.id)
      });

      var active = entry.id === this.props.activeEntryId;
      var props = {
        key: entry.id,
        date: entry.date,
        entryText: entry.entryText,
        id: entry.id,
        tags: tags,
        onClick: this.handleClick
      };

      if (active) {
        props.ref = "activeEntry";
      }

      return <EntryViewItem {...props} />
    });

    return entryItems.reverse();
  }

  handleClick(id, date, entryText, tags) {
    this.props.onClick(id, date, entryText, tags);
  }

  render() {
    return(
      <div id="entry-view-list">
          {this.renderEntryList()}
      </div>
    );
  }
}
