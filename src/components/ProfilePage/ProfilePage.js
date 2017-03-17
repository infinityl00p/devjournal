import React, { Component } from 'react';
import TopTags from './TopTags';
import StatsContainer from './StatsContainer.js';

const data = {
  entries: [
    {
      id: 1,
      entryText: "<code> printf('hello world') </code>",
      tags: [1, 2, 4, 3],
      date: "2017-03-16T14:28:33.797555Z"
    },
    {
      id: 2,
      entryText: "<code> console.log('hello world') </code> ",
      tags: [3, 5, 4],
      date: "2017-03-15T14:28:33.797555Z"
    },
    {
      id: 3,
      entryText: "blah",
      tags: [3,5],
      date: '2017-03-14T14:28:33.797555Z'
    },
    {
      id: 4,
      entryText: "blah",
      tags: [3,5],
      date: '2017-03-14T14:28:33.797555Z'
    },
    {
      id: 5,
      entryText: "blah",
      tags: [3,5],
      date: '2017-03-13T14:28:33.797555Z'
    },
    {
      id: 6,
      entryText: "blah",
      tags: [3,5],
      date: '2017-03-10T14:28:33.797555Z'
    },
    {
      id: 5,
      entryText: "blah",
      tags: [3,5],
      date: '2017-03-09T14:28:33.797555Z'
    }
  ],
  tags: [
    {
      id: 1,
      tagText: '#react'
    },
    {
      id: 2,
      tagText: '#javascript'
    },
    {
      id: 3,
      tagText: '#html'
    },
    {
      id: 4,
      tagText: '#css'
    },
    {
      id: 5,
      tagText: '#bootstrap'
    }
  ],
  avatar: "http://www.skyovnis.com/wp-content/uploads/2014/12/Profile-sky-ovnis.jpg",
  username: "James Gill",
  occupation: "React Developer"
};


export default class ProfilePage extends Component {
  render() {
    return(
      <div id="profile-page-container">
        <div className="col-md-3">
          <div id="personal-info-container">
            <img src={data.avatar} className="img-circle" id="profile-picture" />
            <h1 id="name">{data.username}</h1>
            <h4 id="description">{data.occupation}</h4>
          </div>
          <div id="top-tags-container">
            <TopTags data={data} />
          </div>
        </div>
        <StatsContainer data={data} />
      </div>
    );
  }
}
