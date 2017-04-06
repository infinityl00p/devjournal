import React, { Component } from 'react';

export default class Modal extends Component {
<<<<<<< HEAD
  constructor() {
    super();
=======
  constructor(props) {
    super(props);
>>>>>>> master

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.state = {
<<<<<<< HEAD
      notes: this.props.data.notes,
=======
      notes: this.props.data,
>>>>>>> master
      success: this.props.data.success
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onConfirm(e, this.state);
  }

  handleChange(e) {
    this.setState({
      notes: e.target.value,
    });
  }

  handleCheck() {
    this.setState({
      success: !this.state.success
    });
  }

  render() {
    return (
      <div className='modal' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Day {this.props.dayNumber} of {this.props.title}</h4>
            </div>
            <div className='modal-body'>
              <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                  <label>Notes:</label>
                  <input type='text' onChange={this.handleChange} value={this.state.notes} className='form-control' id='notes' />
                </div>
                <div className='checkbox'>
                  <label><input type='checkbox' onChange={this.handleCheck} checked={this.state.success} />Did you succeed?</label>
                </div>
                <button type='button' onClick={this.props.onCancel} className='btn btn-default' data-dismiss='modal'>Close</button>
                <button type='submit' className='btn btn-default' data-dismiss='modal'>Save and Close</button>
              </form>
            </div>
            <div className='modal-footer'>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/*
Modal.propTypes = {
  onCancel: React.PropTypes.func.isRequired,
  onConfirm: React.PropTypes.func.isRequired
};
*/
