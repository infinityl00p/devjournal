import React, { Component } from 'react';

export default class Tag extends Component {
  render() {
    return(
      <span className='entry-tag'>
        {this.props.data.tagText}
      </span>
    );
  }
}
