import React, { Component } from 'react';
import TopTags from './TopTags';
import InfoTable from './infotable.js';

const data = {
  entries: [
    {
      id: 1,
      entryText: "<code> printf('hello world') </code>",
      tags: [1, 2, 4],
      date: '2017-01-30'
    },
    {
      id: 2,
      entryText: "<code> console.log('hello world') </code> ",
      tags: [3, 5],
      date: '2017-02-02'
    },
    {
      id: 3,
      entryText: "blah",
      tags: [3,5],
      date: "2016-02-02"
    }
  ],
  tags: [
    {
      id: 1,
      tagText: '#one'
    },
    {
      id: 2,
      tagText: '#two'
    },
    {
      id: 3,
      tagText: '#three'
    },
    {
      id: 4,
      tagText: '#four'
    },
    {
      id: 5,
      tagText: '#five'
    }
  ],
  avatar: "http://www.skyovnis.com/wp-content/uploads/2014/12/Profile-sky-ovnis.jpg"
};


export default class ProfilePage extends Component {
  render() {
    return(
      <div className>
        <div className="col-md-3">
        {/*TODO recieve profile image info here, create an image component and pass data through*/}
          <div id="avatar-wrapper">
            <img src={data.avatar} className="img-circle" id="profile-picture"/>
          </div>
        {/*TODO recieve tags by user Id, inser them into this component, then sort and filter*/}
          <div id="top-tags-wrapper">
            <TopTags data={data} />
          </div>
        </div>
        {/*TODO everything else goes here*/}
        <div className="col-md-9">
          <InfoTable data={data} />
        </div>
      </div>
    )
  }
}
