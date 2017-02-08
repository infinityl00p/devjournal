import React, { Component } from 'react';

export default class Entry extends Component {
  constructor(props){
    super(props);
    this.parseCategories = this.parseCategories.bind(this);
  }

  parseCategories(){
    let {categories} = this.props.data;
    return categories.map((entry) => {
      return (<a href="entry" key={entry}> {entry} </a>)
    });
  }

  render(){
    return(
      <div className='individual-entry'>
        {this.props.data.entry}
        <br />
        <div className='category-text'>
          {this.parseCategories()}
        </div>
      </div>
    )
  }

}
