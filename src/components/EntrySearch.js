import React, { Component } from 'react';
import EntryList from './EntryList';

export default class EntrySearch extends Component {
  constructor() {
    super();

    this.renderEntryList = this.renderEntryList.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);

    this.state = {
      searchTerm: '',
      showEntryList: false
    }
  }

  onInputChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    this.onSearch(this.state.searchTerm);
    this.setState({ searchTerm: '', showEntryList: true });
  }

  onSearch(searchTerm) {
    console.log("filter me");
  }

  renderEntryList() {
    if (this.state.showEntryList) {
      return(
        <EntryList
          entries={this.props.entries}
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
          <span className="input-group-btn">
            <button type="submit" className="btn btn-search">Search Entries</button>
          </span>
        </form>
        <div className="search-results">
          <h4>Search results:</h4>
          {this.renderEntryList()}
        </div>
      </div>
    );
  }
}