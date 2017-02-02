import React, { Component } from 'react';

export default class Entry extends Component {
  constructor(props){
    super(props);

    console.log(props);
  }

  render(){
    return(
      <div className='individual-entry'>
        {this.props.data.entry}
        <br />
        {this.props.data.categories}
      </div>
    )
  }

}
