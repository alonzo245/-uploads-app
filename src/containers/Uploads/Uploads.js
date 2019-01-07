import React, { Component } from 'react';
import axios from '../../axios';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Uploads.scss';
import Spinner from '../../components/UI/Spinner/Spinner';

class Uploads extends Component {
  state = {
    files: [],
  };

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
          this.setState({
            files: res.data.info.uploads
          });
          console.log(res.data.info.uploads)
        })
        .catch(err => {
          console.log('err', err)
        });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('A name was submitted: ' + this.state.value);
  }

  componentDidMount() {
    this.updatePosts()
  }

  render() {
    if (!this.state.files.length) {
      console.log('ss')
      return <Spinner />;
    }
    else {
      console.log('bbb')
      return (
        <div className="Social">
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleFormControlFile1">upload file</label>
    <input type="file" className="form-control-file" id="exampleFormControlFile1"/>
            <input type="submit" value="Upload Image" name="submit" />
            </div>
          </form>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">id</th>
                <th scope="col">uploadName</th>
                <th scope="col">privacy</th>
                <th scope="col">creator</th>
                <th scope="col">createdAt</th>
                <th scope="col">updatedAt</th>
                <th scope="col">uploadUrl</th>
              </tr>
            </thead>
            <tbody>
              {this.state.files.map((file, index) => (
                <tr key={index}>
                  <th scope="row">{index}</th>
                  <td>{file._id}</td>
                  <td>{file.uploadName}</td>
                  <td>{file.privacy ? 'yes' : 'no'}</td>
                  <td>{file.creator}</td>
                  <td>{file.createdAt}</td>
                  <td>{file.updatedAt}</td>
                  <td><textarea name="body" readOnly value={file.uploadUrl}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
  }
};

export default Uploads;