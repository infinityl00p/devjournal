import React, { Component } from 'react';

export default class Sidebar extends Component {
  constructor(props){
    super(props);

    this.renderSidebar = this.renderSidebar.bind(this);
  }

  renderSidebar(entries){
    return entries.map((entry) => {
      var categories = entry.categories;
      return categories.map((item) => {
        {console.log(item)};
        return <li className='sidebar-list'>{item}</li>
      })
    })
  }

  render(){
    return(
      <div className='sidebar-list-wrapper'>
        {this.renderSidebar(this.props.entries)}
      </div>
    )
  }
}
