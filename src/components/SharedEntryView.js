import React, { Component } from 'react';
import SharedEntryItem from './SharedEntryItem';
import axios from 'axios';
import base62 from 'base62';

const ROOT_URL = 'http://shielded-basin-84367.herokuapp.com';

export default class SharedEntryView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entry: null
    }

    // TODO: render 404 page if it does not exist / work
    var entryId = base62.decode(this.props.params.hash);
    const request = axios.get(
      ROOT_URL + '/shared/' + entryId,
      entryId
    ).then((response) => {
      this.setState({ entry: response.data.entry });
    });
  }

  render() {
    if (this.state.entry != null) {
      var props = {
        key: this.state.entry.id,
        date: this.state.entry.date,
        entryText: this.state.entry.entryText,
        id: this.state.entry.id,
      };
      return(
        <div id="shared-entry-view" className="col-md-12">
          <SharedEntryItem {...props} />
        </div>
      );
    }
    return (<div className="not-found">Not found.</div>);
  }
}