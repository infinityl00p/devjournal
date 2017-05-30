import React, { Component } from 'react';
import EntryList from './EntryList';
import _ from 'lodash';

export default class EntrySearch extends Component {
  constructor(props) {
    super(props);

    this.renderEntryList = this.renderEntryList.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSearch = this.onSearch.bind(this);

    this.state = {
      searchTerm: '',
      showEntryList: false,
      entries: this.props.entries
    }
  }

  onInputChange(e) {
    this.setState({ searchTerm: e.target.value });
    this.setState({ showEntryList: true });
    this.onSearch(e.target.value);
  }

  onSubmit(e) {
    e.preventDefault();

    this.onSearch(this.state.searchTerm);
    this.setState({ searchTerm: '', showEntryList: true });
  }

  onSearch(searchTerm) {
    var searchEntries = this.props.entries.filter(function (entry) {
      return _.contains(entry.entryText, searchTerm)
    });

    this.setState({ entries: searchEntries });
  }

  renderEntryList() {
    if (this.state.showEntryList) {
      return(
        <EntryList
          entries={this.state.entries}
          tags={this.props.tags}
          onEntryClick={this.props.onEntryClick}
        />
      );
    } else {
      return;
    }
  }

  render() {
    return(
      <div id="entry-search">
        <form onSubmit={this.onSubmit} className="input-group">
          <input
            placeholder="Enter search text"
            className="form-control"
            value={this.state.searchTerm}
            onChange={this.onInputChange}
          />
        </form>
        <div className="search-results">
          <h4>Search results:</h4>
          {this.renderEntryList()}
        </div>
      </div>
    );
  }
}

EntrySearch.propTypes = {
  entries: React.PropTypes.array,
  tags: React.PropTypes.array,
  onEntryClick: React.PropTypes.func
}
