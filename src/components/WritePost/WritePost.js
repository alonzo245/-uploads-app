import React, { Component } from 'react';
import axios from '../../axios';

class WritePost extends Component {
  state = {
    postContent: ''
  };

  handleChange = (event) => {
    this.setState({
      ...this.state,
      postContent: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let that = this;
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {

      let baseUrl = 'https://youflixapi.herokuapp.com';
      if (window.location.hostname === "localhost") {
        baseUrl = window.location.protocol + '//localhost:8000';
      }

      const authOptions = {
        url: baseUrl + '/feed/post',
        method: 'POST',
        data:
        {
          content: this.state.postContent,
          userId: userId
        }
        ,
        headers: {
          "Accept": "application/json",
          "Authorization": "Bearer " + token
        },
        json: true
      };

      axios(authOptions)
        .then(function (response) {
          that.props.updatePosts();
        })
        .catch(err => {
          console.log('err', err)
        });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="w3-row-padding">
          <div className="w3-col m12">
            <div className="w3-card-2 w3-round w3-white">
              <div className="w3-container w3-padding">
                <h6 className="w3-opacity">Social Media template by </h6>
                <input className="w3-border w3-padding WritePostInput"
                  type="text"
                  value={this.state.postContent}
                  onChange={this.handleChange}
                  placeholder="What Your Feeling...?"
                />
                <button type="submit" className="w3-button w3-theme"><i className="fa fa-pencil"></i> &nbsp;Post</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default WritePost;