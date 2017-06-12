import React, { Component } from 'react';
import EntryList from './EntryList';
import FilterTag from './FilterTag';
import _ from 'lodash';

export default class EntryFilter extends Component {
  constructor(props) {
    super(props);

    this.onSelect = this.onSelect.bind(this);
    this.checkActive = this.checkActive.bind(this);
    this.renderTags = this.renderTags.bind(this);

    this.state = {
      entries: this.props.entries,
      tags: this.props.tags,
      filteredTagsArray: []
    }
  }

  onSelect(id){
    var updatedArray;
    if (_.contains(this.state.filteredTagsArray, id)) {
      var index = this.state.filteredTagsArray.indexOf(id);
      updatedArray = this.state.filteredTagsArray;
      updatedArray.splice(index, 1);

      this.setState({ filteredTagsArray: updatedArray });
    } else {
      updatedArray = this.state.filteredTagsArray.concat([id]);
      this.setState({ filteredTagsArray: updatedArray });
    }

    this.props.onFilter(updatedArray);
  }

  checkActive(id) {
    return _.contains(this.state.filteredTagsArray, id);
  }

  renderTags() {
    var tags = this.props.tags.map((tag) => {
      return(
        <li key={tag.id} className="filter-list-item col-md-12">
          <FilterTag
            data={tag}
            id={tag.id}
            icon={"glyphicon-tag"}
            onSelect={this.onSelect}
            active={this.checkActive}
          />
        </li>
      )
    });

    return tags;
  }

  render() {
    return(
      <div id="entry-filter">
        <p className="sub-heading">TAGS</p>
        <ul>{ this.renderTags() }</ul>
      </div>
    );
  }

}