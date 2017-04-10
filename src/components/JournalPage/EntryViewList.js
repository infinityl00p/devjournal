import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import EntryViewItem from './EntryViewItem';

export default class EntryViewList extends Component {
  constructor(props) {
      super(props);

      this.renderEntryList = this.renderEntryList.bind(this);
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
        onDelete: this.props.onDelete
      };
      if (active) {
        props.ref = "activeEntry";
      }
      return <EntryViewItem {...props} />
    });

    return entryItems.reverse();
  }

  render() {
    return(
      <div id="entry-view-list">
          {this.renderEntryList()}
      </div>
    );
  }
}

EntryViewList.proptypes = {
  activeEntryId: React.PropTypes.number,
  entries: React.PropTypes.array,
  selectedEntryId: React.PropTypes.number,
  tags: React.PropTypes.array
}
