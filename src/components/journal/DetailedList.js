import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import EntryViewItem from './EntryViewItem';

export default class DetailedList extends Component {
  constructor() {
      super();

      this.renderDetailedEntryList = this.renderDetailedEntryList.bind(this);
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

  renderDetailedEntryList() {
    var entryItems = this.props.entries.map((entry) => {
      var tags = this.props.tags.filter(function (tag) {
        return _.contains(entry.tags, tag.id);
      });

      var active = entry.id === this.props.activeEntryId;
      var props = {
        key: entry.id,
        date: entry.date,
        entryText: entry.entryText,
        id: entry.id,
        tags: tags,
        onClick: this.props.onClick,
        onDelete: this.props.onDelete,
        onEdit: this.props.onEdit
      };
      if (active) { props.ref = "activeEntry"; }
      return <EntryViewItem {...props} />
    });

    return entryItems.reverse();
  }

  render() {
    return(
      <div id="entry-view-detailed-list">
          {this.renderDetailedEntryList()}
      </div>
    );
  }
}

DetailedList.proptypes = {
  activeEntryId: React.PropTypes.number,
  entries: React.PropTypes.array,
  selectedEntryId: React.PropTypes.number,
  tags: React.PropTypes.array
}
