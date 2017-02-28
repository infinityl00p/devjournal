import React, { Component } from 'react';
import EntryViewItem from './EntryViewItem';
import EntryViewList from './EntryViewList';

export default class EntryView extends Component {
  constructor(props) {
    super(props);

    this.getSelectorClass = this.getSelectorClass.bind(this);
    this.handleViewStateChange = this.handleViewStateChange.bind(this);
    this.renderEntryView = this.renderEntryView.bind(this);
    this.renderEntry = this.renderEntry.bind(this);

    this.state = {
      multiViewState: false,
      activeId: this.props.currentEntry.entry.id,
      activeDate: this.props.currentEntry.entry.date,
      activeEntryText: this.props.currentEntry.entry.entryText,
      activeTags: this.props.currentEntry.tags
    }
  }

  handleViewStateChange() {
    var prevState = this.state.multiViewState;
    this.setState({ multiViewState: !prevState });
  }

  getSelectorClass() {
    if (this.state.multiViewState) {
      return "entry-view-selector-multi col-md-offset-11";
    }
    return "entry-view-selector col-md-offset-11";
  }

  renderEntry(id, date, entryText, tags) {
    this.setState({
      activeId: id,
      activeDate: date,
      activeEntryText: entryText,
      activeTags: tags
    });
  }

  renderEntryView() {
    if (this.state.multiViewState) {
      return(
        <EntryViewList
          activeEntryId={this.props.currentEntry.entry.id}
          entries={this.props.entries}
          selectedEntryId={this.props.currentEntry.entry.id}
          tags={this.props.tags}
          onClick={this.renderEntry}
        />
      );
    }
    return(
      <EntryViewItem
        id={this.state.activeId}
        date={this.state.activeDate}
        entryText={this.state.activeEntryText}
        tags={this.state.activeTags}
        onClick={this.renderEntry}
      />
    );
  }

  render() {
    return(
      <div className="col-md-8" id="entry-view">
        <div className={this.getSelectorClass()}>
          <span className="glyphicon glyphicon-th-list" onClick={this.handleViewStateChange}/>
        </div>
        {this.renderEntryView()}
      </div>
    );
  }
}
