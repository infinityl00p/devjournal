import React, { Component } from 'react';
import MarkdownPreview from './MarkdownPreview';

export default class CreateEntryModal extends Component {
  constructor(props) {
    super(props);

    this.handleEntryChange = this.handleEntryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      entryText: ""
      //tags: this.tagsToString(this.props.tags)
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onConfirm(e, this.state.entryText);
  }

  handleEntryChange(e) {
    this.setState({
      entryText: e.target.value
    });
  }

  handleChange(e) {
    var entryRef = this.refs.entry;
    this.setState({
      entryText: entryRef.value
    })
  }

  render() {
    return (
      <div id="edit-modal" className="modal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label className="edit-entry-header">Add a new entry: </label>
                  <textarea rows="15" onChange={this.handleEntryChange} value={this.state.entryText} className="form-control entry-textarea"></textarea>
                  <input className="form-control tags-input" placeholder="#enter #tags #separated #byspace" ref="tags"/>
                  <MarkdownPreview entryText={this.state.entryText} />
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
