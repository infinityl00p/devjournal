import React, { Component } from 'react';
import TopTags from './TopTags';
import ProfileView from './ProfileView';
import * as actionCreators from '../../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

const USER_ID = localStorage.getItem('userId');

const data = {
  avatar: "http://www.skyovnis.com/wp-content/uploads/2014/12/Profile-sky-ovnis.jpg",
  username: "James Gill",
  joinDate: "2017-03-09",
  occupation: "React Developer"
};

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.props.actions.getEntriesAndTags(USER_ID);

    this.sortByDate = this.sortByDate.bind(this);

    this.state = {
      data: props.journal
    }
  }

  componentWillReceiveProps(nextProps) {
    var sortedProps = this.sortByDate(nextProps);
    this.setState({
      data: sortedProps.journal
    });
  }

  sortByDate(props) {
    props.journal.entries.sort((a,b) => {
      return new Date(a.date) - new Date(b.date);
    });

    return props;
  }

  render() {
    if (!this.props.journal) {
      return(
        <div><h3>Create a Post to Unlock this Page</h3></div>
      );
    }
    return(
      <div id="profile-page-container">
        <div className="col-sm-3" id="user-profile">
          <div id="personal-info-container">
            <img src={data.avatar} className="img-circle" id="profile-picture" />
            <h1 id="name">{data.username}</h1>
            <h4 id="description">{data.occupation}</h4>
            <h6 id="joinDate"> Member Since: {data.joinDate}</h6>
          </div>
          <div id="top-tags-container">
            <TopTags data={this.state.data} />
          </div>
        </div>
        <div className="col-sm-7">
          <ProfileView data={this.state.data} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { journal: state.entries };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
