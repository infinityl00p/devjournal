import React, { Component } from 'react';

export default class Modal extends Component {
  constructor(props) {
    super(props);

    this.handleEntryChange = this.handleEntryChange.bind(this);
    //this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  //  this.tagsToString = this.tagsToString.bind(this);
    //this.splitTags = this.splitTags.bind(this);

    this.state = {
      entryText: this.props.entryText
      //tags: this.tagsToString(this.props.tags)
    };
  }

  //TODO: update tags on submit
  handleSubmit(e) {
    e.preventDefault();
    //var entryTags = this.splitTags(this.state.tags);
    this.props.onConfirm(e, this.state.entryText);
  }

  handleEntryChange(e) {
    this.setState({
      entryText: e.target.value
    });
  }

  render() {
    return (
      <div id="edit-modal" className="modal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label className="edit-entry-header">Edit Entry: </label>
                  <textarea rows="15" onChange={this.handleEntryChange} value={this.state.entryText} className="form-control entry-textarea"></textarea>
                </div>
                <button type="button" onClick={this.props.onCancel} className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-default" data-dismiss="modal">Save and Close</button>
              </form>
            </div>
            <div className="modal-footer">
            </div>
          </div>
        </div>
      </div>
    );
  }
}
