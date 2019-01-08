import React, { Component } from 'react';
import axios from '../../axios';
import FD from 'js-file-download';
import Spinner from '../../components/UI/Spinner/Spinner';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Uploads.scss';
import Moment from 'react-moment';

class Uploads extends Component {
  state = {
    files: [],
    selectedFile: null
  };

  componentDidMount() {
    this.getFiles()
  }

  // GET 
  getFiles() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      let baseUrl = '';
      if (window.location.hostname === "localhost") {
        baseUrl = window.location.protocol + '//localhost:3000';
      }
      let url = baseUrl + '/upload/files';

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      };

      const data = {
        userId: userId
      };

      axios.post(url, data, config)
        .then(res => {
          this.setState({
            files: res.data.info.uploads
          });
        })
        .catch(err => {
          console.log('err', err)
        });
    }
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

  // INSERT 
  handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      let baseUrl = '';
      if (window.location.hostname === "localhost") {
        baseUrl = window.location.protocol + '//localhost:3000';
      }
      let url = baseUrl + '/upload/file';

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + token
        },
        onUploadProgress: progressEvent => {
          console.log(progressEvent.loaded / progressEvent.total)
        }
      };

      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('privacy', false);
      formData.append('fileUpload', this.state.selectedFile);


      axios.post(url, formData, config)
        .then(res => {
          let updatedFiles = this.state.files.slice();
          updatedFiles.push(res.data.upload);
          this.setState({
            // selectedFile: null,
            files: updatedFiles
          })
        })
        .catch(err => {
          console.log('err', err)
        });
    }
  }

  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  }

  render() {
    if (!this.state.files) {
      return <Spinner />;
    }
    else {
      return (
        <div className="Social">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="file"
                onChange={this.handleselectedFile}
              />
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
                    <Moment format="DD/MM/YYYY HH:MM" date={file.createdAt} />
                  </td>
                  <td>
                    <Moment format="DD/MM/YYYY HH:MM" date={file.updatedAt} />
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