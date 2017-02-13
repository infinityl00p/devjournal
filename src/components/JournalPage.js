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

    this.props.actions.getEntries();
    this.props.actions.getTags();

    this.createEntryAndTags = this.createEntryAndTags.bind(this);
    this.createNewTags = this.createNewTags.bind(this);

    this.state = {
      entries: this.props.data.entries,
      tags: this.props.data.tags
    }
  }


  createEntryAndTags(newEntryAndTags){
    var tagIds;
    var existingTagsMap = _.reduce(this.props.data.tags, function (existingTagsMap, tag) {
      existingTagsMap[tag.tagText] = tag.id;
      return existingTagsMap;
    }, {});

    if (newEntryAndTags.tags !== null && newEntryAndTags.tags.length > 0) {
      tagIds = this.createNewTags(newEntryAndTags.tags, existingTagsMap);
    } else {
      tagIds = [];
    }

    this.props.actions.createEntry({
      entryText: newEntryAndTags.entryText,
      tags: tagIds
    });
  }

  createNewTags(tags, existingTagsMap) {
    var ac = this.props.actions;

    var tagIds = tags.map(function(tag) {
      if (tag in existingTagsMap) {
        return existingTagsMap[tag];
      } else {
        console.log("creating new tag:", tag);
        ac.createTag({tagText: tag}).then((newTag) => {
          // TODO: this is done sync so this id is undefined at the time of this statement. need to figure out better way to add.
          // could create an endpoint that creates tags AND entry together and let the backend handle this.
          return newTag.payload.data.id;
        });
      }
    });

    return tagIds;
  }

  render(){
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
                  <EntryList entries={this.state.entries} tags={this.state.tags} />
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
    entries: state.entries,
    tags: state.tags
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(JournalPage)
