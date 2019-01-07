import React, { Component } from 'react';
import axios from '../../axios';
import './Uploads.scss';
import Spinner from '../../components/UI/Spinner/Spinner';

class Uploads extends Component {
  state = {
    files: [],
  }

  updatePosts() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      console.log(token)
      console.log(userId)
      let baseUrl = '';
      if (window.location.hostname === "localhost") {
        baseUrl = window.location.protocol + '//localhost:3000';
      }
      let url = baseUrl + '/upload/files';

      const headers = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      };

      const data = {
        userId: userId
      };

      axios.post(url, data, headers)
        .then(res => {

          // this.setState({
          //   ...this.state,
          //   posts: res.data.posts,
          //   totlaPosts: res.data.totlaItems
          // })
          console.log(res.data.info.uploads)
        })
        .catch(err => {
          console.log('err', err)
        });
    }
  }
  componentDidMount() {
    this.updatePosts()
  }

  render() {
    if (!this.state.files.length) {
      return (
        <div className="Social">

          <Spinner />
        </div>
      );
    }
    else {
      return (
        <div className="Social">

        </div>
      )
    }
  }
};

export default Uploads;