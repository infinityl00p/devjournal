import React, { Component } from 'react';
import Tag from './Tag';
import FilterTag from './FilterTag';
import EntryList from './EntryList';


export default class EntryFilter extends Component {
  constructor(props) {
    super(props);

    this.renderTags = this.renderTags.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.checkActive = this.checkActive.bind(this);
    this.renderEntryList = this.renderEntryList.bind(this);
    this.collapseTags = this.collapseTags.bind(this);

    // TODO: for rendering EntryList
    this.state = {
      entries: this.props.entries,
      tags: this.props.tags,
      stateArray: [],
      showEntryList: false,
      collapse: false
    }
  }

  handleClick(id){
    if (_.contains(this.state.stateArray, id)) {
      var index = this.state.stateArray.indexOf(id);
      this.state.stateArray.splice(index, 1);

      this.setState({
        stateArray: this.state.stateArray
      });

      if (this.state.stateArray.length === 0) {
        this.setState({
          showEntryList: false
        });
      }
    }

    else {
      this.setState({
        stateArray: this.state.stateArray.concat([id]),
        showEntryList: true
      });
    }
  }


  checkActive(id) {
    return _.contains(this.state.stateArray, id);
  }

  renderTags() {
    var tags = this.props.tags.map((tag) => {
      return(
          <li key={tag.id} className="filter-list-item col-md-6">
            <FilterTag
              data={tag}
              id={tag.id}
              onClick={this.handleClick}
              active={this.checkActive}
            />
          </li>
      )
    });
    return tags;
  }


  renderEntryList() {
    var stateArray = this.state.stateArray;
    if (this.state.showEntryList) {
      var filteredEntries = this.props.entries.filter(function (entry) {
        if (_.intersection(entry.tags, stateArray).length > 0) {
          return entry
        }
      });

      return(
        <EntryList
          entries={filteredEntries}
          tags={this.props.tags}
          onEntryClick={this.props.onEntryClick}
        />
      );
    } else {
      return;
    }
  }

  collapseTags() {
    if(this.state.collapse === false) {
      this.setState({
        collapse: true
      });
    }
    else {
      this.setState({
        collapse: false
      });
    }
  }

  render() {
    return(
      <div id="filter">
        <div id="entry-filter"  className={this.state.collapse ? "hide" : "col-md-12" }>
          <ul>{this.renderTags()}</ul>
        </div>
        <button id="filter-button" type="submit" className="btn btn-info" onClick={this.collapseTags}>Show/Hide Tags</button>
        <div className="filter-results">
          {this.renderEntryList()}
        </div>
      </div>
      );
  }
}

EntryFilter.propTypes = {
  entries: React.PropTypes.array,
  tags: React.PropTypes.array,
  onEntryClick: React.PropTypes.func
}