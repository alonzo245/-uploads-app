import React, { Component } from 'react';
import axios from '../../axios';
import FD from 'js-file-download';
import Spinner from '../../components/UI/Spinner/Spinner';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Modal from '../../components/UI/Modal/Modal';
import UploadsTable from '../../components/UploadsTable/UploadsTable';
import './Uploads.scss';


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

  // GET FILES ***********************************************/
  getFiles() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    axios
      .post(
        window.location.protocol + '//localhost:3000/upload/files',
        {
          userId: userId
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        })
      .then(res => {
        this.setState({
          files: res.data.info.uploads
        });
      })
      .catch(err => {
        console.log('err', err)
      });

  }

  // DOWNLOAD AND GET FILES DATA ***********************************************/
  getFileDownloadOrFileMetadata = (index, metadata = false) => {
    let url = window.location.protocol
      + '//localhost:3000/upload/file/' + this.state.files[index].uploadName;
    if (metadata) url += '?metadata=true';

    axios
      .get(url,
        {
          headers: {
            'X-Access-Token': this.state.files[index]._id
          }
        })
      .then(res => {
        if (!metadata) {
          FD(res, this.state.files[index].uploadName);
        } else {
          let output = '';
          let i = 0;
          const keys = Object.keys(res.data.upload);
          for (i = 0; i < keys.length; i++) {
            output += '<strong>' + keys[i] + ':</strong> ' + res.data.upload[keys[i]] + ' <br/> ';
          }
          this.setState({
            showDetails: true,
            fileDetails: { __html: output }
          });
        }
      })
      .catch(err => {
        console.log('err', err)
      });
  }

  // INSERT FILE ***********************************************/
  handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('privacy', false);
    formData.append('fileUpload', this.state.selectedFile);

    axios
      .post(
        window.location.protocol + '//localhost:3000/upload/file',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token
          }
        })
      .then(res => {
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

  // UPDATE FILES PRIVACY ***********************************************/
  handleInputCheckbox(index) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const { privacy, uploadUrl } = this.state.files[index];

    axios
      .put(
        window.location.protocol + 
        '//localhost:3000/upload/file/' + this.state.files[index]._id,
        {
          userId: userId,
          privacy: !privacy,
          uploadUrl: uploadUrl
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        })
      .then(res => {
        const updatedFiles = [...this.state.files];
        updatedFiles[index] = res.data.upload
        this.setState({
          files: updatedFiles
        });
      })
      .catch(err => {
        console.log('err', err)
      });
  }

  // DELETE FILES ***********************************************/
  deleteUpload(index) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const url = window.location.protocol
      + '//localhost:3000/upload/file/' + this.state.files[index]._id;
    axios.delete(
      url,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        data: {
          userId: userId
        }
      })
      .then(res => {
        let updatedFiles = [...this.state.files];
        updatedFiles.splice(index, 1);
        this.setState({
          files: updatedFiles
        });
      })
      .catch(err => {
        console.log('err', err)
      });
  }

  // SELECT FILE TO UPLOAD ***********************************************/
  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
    event.target.value = null;
  }

  // SELECT FILE TO UPLOAD ***********************************************/
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
            modalClosed={this.showDetailsCancelHandler}>
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
          <UploadsTable
            files={this.state.files}
            getFileDownloadOrFileMetadata={this.getFileDownloadOrFileMetadata}
            deleteUpload={this.deleteUpload}
            handleInputCheckbox={this.handleInputCheckbox}
          />
        </div>
      )
    }
  }
};

export default Uploads;