import React, { Component } from 'react';
import EntryViewItem from './EntryViewItem';
import EntryViewList from './EntryViewList';

export default class EntryView extends Component {
  constructor(props) {
    super(props);

    this.getSelectorClass = this.getSelectorClass.bind(this);
    this.handleViewStateChange = this.handleViewStateChange.bind(this);
    this.renderEntryView = this.renderEntryView.bind(this);

    this.state = {
      multiViewState: false,
      activeEntryData: {
        id: this.props.currentEntry.entry.id,
        date: this.props.currentEntry.entry.date,
        entryText: this.props.currentEntry.entry.entryText,
        tags: this.props.currentEntry.tags
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      activeEntryData: {
        id: nextProps.currentEntry.entry.id,
        date: nextProps.currentEntry.entry.date,
        entryText: nextProps.currentEntry.entry.entryText,
        tags: nextProps.currentEntry.tags
      }
    });
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

  renderEntryView() {
    if (this.state.multiViewState) {
      return(
        <EntryViewList
          activeEntryId={this.props.currentEntry.entry.id}
          entries={this.props.entries}
          selectedEntryId={this.props.currentEntry.entry.id}
          tags={this.props.tags}
          onClick={this.props.setActiveEntry}
          onDelete={this.props.onDelete}
        />
      );
    }
    return(
      <EntryViewItem
        id={this.state.activeEntryData.id}
        date={this.state.activeEntryData.date}
        entryText={this.state.activeEntryData.entryText}
        tags={this.state.activeEntryData.tags}
        onDelete={this.props.onDelete}
        onEdit={this.props.onEdit}
        handleLeftClick={this.props.renderOlderEntry}
        handleRightClick={this.props.renderNewerEntry}
        singleView={true}
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

EntryView.propTypes = {
  currentEntry: React.PropTypes.object,
  entries: React.PropTypes.array,
  tags: React.PropTypes.array
}
