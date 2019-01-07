import React, { Component } from 'react';
import axios from '../../axios';
import FD from 'js-file-download';
import Spinner from '../../components/UI/Spinner/Spinner';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Uploads.scss';

class Uploads extends Component {
  state = {
    files: [],
  };

  updatePosts() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
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

  handleGetMetadata = (fileId = null, fileName = null, privacy = false, metadata = false) => {

    if (!fileName) {
      return false;
    }
    let baseUrl = '';
    if (window.location.hostname === "localhost") {
      baseUrl = window.location.protocol + '//localhost:3000';
    }
    let url = baseUrl + '/upload/file/' + fileName;

    if (metadata) {
      url += '?metadata=true';
    }

    let headers = {};
    if (privacy) {
      headers = {
        headers: {
          'X-Access-Token': fileId
        }
      };
    }

    axios.get(url, headers)
      .then(res => {
        if (!metadata) {
          FD(res, fileName);
        }
        console.log(res.data.info.uploads)
      })
      .catch(err => {
        console.log('err', err)
      });
  }

  render() {
    if (!this.state.files.length) {
      return <Spinner />;
    }
    else {
      return (
        <div className="Social">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleFormControlFile1">upload file</label>
              <input type="file" className="form-control-file" id="exampleFormControlFile1" />
              <input type="submit" value="Upload Image" name="submit" />
            </div>
          </form>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                {/* <th scope="col">id</th> */}
                <th scope="col">uploadName</th>
                <th scope="col">privacy</th>
                <th scope="col">createdAt</th>
                <th scope="col">updatedAt</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.state.files.map((file, index) => (
                <tr key={index}>
                  <th scope="row">{index}</th>
                  {/* <td>{file._id}</td> */}
                  <td>{file.uploadName}</td>
                  <td>{file.privacy ? 'yes' : 'no'}</td>
                  {/* <td>{file.creator}</td> */}
                  <td>
                    {file.createdAt}
                  </td>
                  <td>
                    {file.updatedAt}
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleGetMetadata(file._id, file.uploadName, file.privacy)}>
                      Download
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleGetMetadata(file._id, file.uploadName, file.privacy, true)}>
                      File Data
                    </button>
                  </td>
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