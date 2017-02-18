import React, { Component } from 'react';
import EntryForm from './EntryForm';
import EntryList from './EntryList';
import * as actionCreators from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

// import Sidebar from './Sidebar';

class JournalPage extends Component {
  constructor(props) {
    super(props);

    this.createEntryAndTags = this.createEntryAndTags.bind(this);
    this.getNewAndExistingTags = this.getNewAndExistingTags.bind(this);

    this.props.actions.getEntriesAndTags();
  }


  createEntryAndTags(newEntryAndTags){
    var newAndExistingTags;

    var existingTagsMap = _.reduce(this.props.data.tags, function (existingTagsMap, tag) {
      existingTagsMap[tag.tagText] = tag.id;
      return existingTagsMap;
    }, {});

    if (newEntryAndTags.tags !== null && newEntryAndTags.tags.length > 0) {
      newAndExistingTags = this.getNewAndExistingTags(newEntryAndTags.tags, existingTagsMap);
    } else {
      newAndExistingTags = {};
    }

    this.props.actions.createEntryAndTags({
      entryText: newEntryAndTags.entry,
      newTags: newAndExistingTags.newTags,
      existingTagIds: newAndExistingTags.existingTagIds
    });
  }

  getNewAndExistingTags(tags, existingTagsMap) {
    var newTags = [];
    var existingTagIds = [];

    tags.forEach(function(tag) {
      if (tag in existingTagsMap) {
        existingTagIds.push(existingTagsMap[tag]);
      } else {
        newTags.push(tag);
      }
    });

    return { newTags: newTags, existingTagIds: existingTagIds };
  }

  render() {
    if (!this.props.journal) {
      return(
        <div><h3>Loading...</h3></div>
      );
    }
    return(
      <div id='journal-page-container'>
        { /*
          TODO: This needs to be a container component
         */ }
        <div id='sidebar-container'>
          <ul className='sidebar-nav'>
            <li>
              <div className='entry-form-container'>
                <EntryForm onSubmit={this.createEntryAndTags}/>
              </div>
            </li>
            <div className="category-container">
              { /* <Sidebar entries={this.state.entries}/> */ }
            </div>
          </ul>
        </div>
        { /*
          TODO: This needs to be cleaned up, some of it is superfluous
         */ }
        <div className='page-content-container'>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className='entry-list-container'>
                  <EntryList entries={this.props.journal.entries} tags={this.props.journal.tags} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    journal: state.entries
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(JournalPage)
