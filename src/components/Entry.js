import React, { Component } from 'react';
import Tag from './Tag';

export default class Entry extends Component {
  render(){
    return(
      <div className='entry-container'>
        <div className='entry-text'>
          {this.props.entry.entryText}
        </div>
        <div className='tag-container'>
          { // TODO: should map tag master array instead
            this.props.tags.map((tag) =>
              <Tag key={tag.id} data={tag} />
            )
          }
        </div>
      </div>
    );
  }

}
