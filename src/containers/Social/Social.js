import React, { Component } from 'react';
import axios from '../../axios';
import './Social.scss';
import Spinner from '../../components/UI/Spinner/Spinner';

class Social extends Component {
  state = {
    posts: [],
    totalPosts: 0,
    updatePosts: false
  }


  handleUpdatePosts = () => {
    console.log('this.state.updatePosts', this.state.updatePosts)
    this.updatePosts()
  }

  updatePosts() {
    const token = localStorage.getItem('token');
    if (token) {
      
      let baseUrl = '';
      if (window.location.hostname === "localhost") {
        baseUrl = window.location.protocol + '//localhost:3000';
      }
      let url = baseUrl + '/feed/posts';
      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
      }
      axios.get(url, null, headers)
        .then(res => {

          this.setState({
            ...this.state,
            posts: res.data.posts,
            totlaPosts: res.data.totlaItems
          })
          console.log(res.data.posts[0])
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
    if (!this.state.posts.length) {
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

export default Social;