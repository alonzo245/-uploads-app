import React, { Component } from 'react';
import axios from '../../axios';
import FD from 'js-file-download';
import Spinner from '../../components/UI/Spinner/Spinner';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Modal from '../../components/UI/Modal/Modal';
import './Uploads.scss';
import { FaFileDownload, FaInfoCircle, FaTrashAlt } from "react-icons/fa";
import Moment from 'react-moment';

class Uploads extends Component {
  state = {
    files: [],
    selectedFile: null,
    showDetails: false,
    fileDetails: null
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
        } else {
          let myString = '';
          let i = 0;
          const keys = Object.keys(res.data.upload);
          for (i = 0; i < keys.length; i++) {
            myString += '<strong>' + keys[i] + ':</strong> ' + res.data.upload[keys[i]] + ' <br/> ';
          }
          this.setState({
            showDetails: true,
            fileDetails: { __html: myString }
          });
        }
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
          console.log(res.message)
          if (!res.data.upload) {
            return false;
          }

          let updatedFiles = this.state.files.slice();
          updatedFiles.push(res.data.upload);
          this.setState({
            files: updatedFiles,
            selectedFile: null
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
    event.target.value = null;
  }

  handleInputCheckbox(fileIndex) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    };
    // console.log(this.state.files[fileIndex].privacy)
    const { privacy, uploadUrl } = this.state.files[fileIndex];
    const data = {
      userId: userId,
      privacy: !privacy,
      uploadUrl: uploadUrl
    };

    let baseUrl = '';
    if (window.location.hostname === "localhost") {
      baseUrl = window.location.protocol + '//localhost:3000';
    }
    let url = baseUrl + '/upload/file/' + this.state.files[fileIndex]._id;


    axios.put(url, data, config)
      .then(res => {
        // console.log(res)
        const updatedFiles = [...this.state.files];
        // console.log(updatedFiles)
        updatedFiles[fileIndex] = res.data.upload
        this.setState({
          files: updatedFiles
        });
      })
      .catch(err => {
        console.log('err', err)
      });
  }

  handleDeleteUpload(fileIndex) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: {
        userId: userId
      },
      onUploadProgress: progressEvent => {
        console.log(progressEvent.loaded / progressEvent.total)
      }
    };

    let baseUrl = '';
    if (window.location.hostname === "localhost") {
      baseUrl = window.location.protocol + '//localhost:3000';
    }
    let url = baseUrl + '/upload/file/' + this.state.files[fileIndex]._id;


    axios.delete(url, config)
      .then(res => {
        let updatedFiles = [...this.state.files];
        updatedFiles.splice(fileIndex, 1);
        this.setState({
          files: updatedFiles
        });
      })
      .catch(err => {
        console.log('err', err)
      });
  }

  showDetailsCancelHandler = () => {
    this.setState({ showDetails: false });
  }

  render() {
    if (!this.state.files) {
      return <Spinner />;
    }
    else {
      return (
        <div className="Uploads">
          <Modal
            show={this.state.showDetails}
            modalClosed={this.showDetailsCancelHandler}
          >
            <div dangerouslySetInnerHTML={this.state.fileDetails} />;
          </Modal>
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
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.state.files.map((file, index) => (
                <tr key={index}>
                  <th scope="row">{index}</th>
                  <td>{file.uploadName}</td>
                  <td>
                    <input type="checkbox" name="privacy"
                      checked={file.privacy ? "checked" : ""}
                      onChange={() => this.handleInputCheckbox(index)}
                    />
                  </td>
                  <td>
                    <Moment format="DD/MM/YYYY HH:MM" date={file.createdAt} />
                  </td>
                  <td>
                    <Moment format="DD/MM/YYYY HH:MM" date={file.updatedAt} />
                  </td>
                  <td>
                    <FaFileDownload
                      className="ActionBtn"
                      onClick={() => this.handleGetMetadata(file._id, file.uploadName, file.privacy)}>
                    </FaFileDownload>
                  </td>
                  <td>
                    <FaInfoCircle
                      className="ActionBtn"
                      onClick={() => this.handleGetMetadata(file._id, file.uploadName, file.privacy, true)}>
                    </FaInfoCircle>
                  </td>
                  <td>
                    <FaTrashAlt
                      className="ActionBtn"
                      onClick={() => this.handleDeleteUpload(index)}>
                    </FaTrashAlt>
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