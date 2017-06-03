import React, { Component } from 'react';

import EntryViewItem from './EntryViewItem';
import DetailedList from './DetailedList';
import SimpleList from './SimpleList';

export default class EntryView extends Component {
  constructor(props) {
    super(props);

    this.onDetailedListClick = this.onDetailedListClick.bind(this);
    this.onSimpleListClick = this.onSimpleListClick.bind(this);
    this.handleViewStateChange = this.handleViewStateChange.bind(this);
    this.renderEntryView = this.renderEntryView.bind(this);

    this.state = {
      viewState: 'detailed',
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

  onDetailedListClick() {
    this.handleViewStateChange('detailed');
  }

  onSimpleListClick() {
    this.handleViewStateChange('simple');
  }

  handleViewStateChange(viewState) {
    this.setState({ viewState: viewState });
  }

  renderEntryView() {
    if (this.state.viewState === 'detailed') {
      return(
        <DetailedList
          activeEntryId={this.props.currentEntry.entry.id}
          entries={this.props.entries}
          selectedEntryId={this.props.currentEntry.entry.id}
          tags={this.props.tags}
          onClick={this.props.setActiveEntry}
          onDelete={this.props.onDelete}
          onEdit={this.props.onEdit}
        />
      );
    } else if (this.state.viewState === 'simple') {
      return(
        <SimpleList
          entries={this.props.entries}
          tags={this.props.tags}
        />
      );
    }

    // TODO: We'll probably get rid of 'single view' in favour of expanding / displaying the entry within the list
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

  getActiveIcon(iconClass, viewState) {
    var cname = "glyphicon " + iconClass;
    if (viewState === this.state.viewState) {
      return cname + " active";
    }
    return cname;
  }

  render() {
    return(
      <div className="col-md-8" id="entry-view">
        <div className="entry-view-selector col-md-offset-10">
          <span
            className={this.getActiveIcon("glyphicon-th-list", 'detailed')}
            onClick={this.onDetailedListClick}
          />
          <span
            className={this.getActiveIcon("glyphicon-list", 'simple')}
            onClick={this.onSimpleListClick}
          />
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
