import React, { Component } from 'react';

export default class EntrySearch extends Component {
  constructor() {
    super();

    this.state = {
        searchTerm: ''
    }
  }

  onInputChange(e) {
    this.setState({ searchTerm: event.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.onSubmit(this.state.searchTerm);
    this.setState({ searchTerm: '' });
  }

  render() {
    return(
      <form onSubmit={this.onSubmit} className="input-group" id="entry-search">
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
    );
  }
}