import React, { Component } from 'react';

export default class Entry extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className='individual-entry'>
        {this.props.data.entry}
        <br />
        <div className='category-text'>
          {this.props.data.categories}
        </div>
      </div>
    )
  }

}
