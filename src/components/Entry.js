import React, { Component } from 'react';

export default class Entry extends Component {
  render(){
    return(
      <div className='individual-entry'>
        {this.props.data.entry}
        <br />
        <div className='category-text'>
          { // TODO: These should map into a Label componet
            this.props.data.categories.join(' ')
          }
        </div>
      </div>
    )
  }

}
