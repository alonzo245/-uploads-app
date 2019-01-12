import React, { Component } from 'react';
import axios from '../../axios';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Modal from '../../components/UI/Modal/Modal';
import UploadsTable from '../../components/UploadsTable/UploadsTable';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import './Uploads.scss';

class Uploads extends Component {
  componentDidMount() {
    this.props.onFetchUploads()
  }

  handleFileSubmit = event => {
    console.log(this.props.selectedFile)
    this.props.onUploadFileSubmit(event, this.props.selectedFile);
  }

  render() {
    if (!this.props.files) {
      return <Spinner />;
    }
    else {
      return (
        <div className="Uploads">
          <Modal
            show={this.props.showModal}
            modalClosed={this.props.onHideModal}>
            <div dangerouslySetInnerHTML={this.props.fileDetails} />;
          </Modal>

          <form onSubmit={this.handleFileSubmit}>
            <div className="form-group">
              <input
                type="file"
                onChange={this.props.onPrepareFileUpload}
              />
              <input type="submit" value="Upload Image" name="submit" />
            </div>
          </form>

          <UploadsTable
            files={this.props.files}
            getFileDownloadOrFileMetadata={this.props.onFetchUploadDataOrDownload}
            deleteUpload={this.props.onDeleteUploads}
            updatePrivacyUpload={this.props.onUpdatePrivacyUpload}
          />
        </div>
      )
    }
  }
};

const mapStateToProps = state => {
  return {
    files: state.uploads.files,
    showModal: state.uploads.showModal,
    selectedFile: state.uploads.selectedFile,
    fileDetails: state.uploads.fileDetails,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchUploads: () => dispatch(actions.fetchUploads()),
    onHideModal: () => dispatch(actions.hideModal()),
    onPrepareFileUpload: (event) => dispatch(actions.prepareFileUpload(event)),
    onUploadFileSubmit: (event, selectedFileUpload) => dispatch(actions.uploadFileSubmit(event, selectedFileUpload)),
    onDeleteUploads: (index, uploadId) => dispatch(actions.deleteUploads(index, uploadId)),
    onUpdatePrivacyUpload: (index, uploadId) => dispatch(actions.updatePrivacyUpload(index, uploadId)),
    onFetchUploadDataOrDownload: (index, uploadName, getMetadata) => dispatch(actions.fetchUploadDataOrDownload(index, uploadName, getMetadata)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( Uploads, axios ));

  // state = {
    // selectedFile: null,
    // showModal: false,
    // fileDetails: null
  // };

  // INSERT FILE ***********************************************/
  // handleUploadFileSubmit = event => {
  //   event.preventDefault();
  //   const token = localStorage.getItem('token');
  //   const userId = localStorage.getItem('userId');
  //   const formData = new FormData();

  //   formData.append('userId', userId);
  //   formData.append('privacy', false);
  //   formData.append('fileUpload', event.target.files[0]);

  //   axios
  //     .post(
  //       '/upload/file',
  //       formData,
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //           'Authorization': 'Bearer ' + token
  //         }
  //       })
  //     .then(res => {
  //       if (!res.data.upload) {
  //         return false;
  //       }

  //       let updatedFiles = this.props.files.slice();
  //       updatedFiles.push(res.data.upload);
  //       this.setState({
  //         files: updatedFiles,
  //         selectedFile: null
  //       })
  //       event.target.value = null;
  //     })
  //     .catch(err => {
  //       console.log('err', err)
  //     });
  // }


  // SELECT FILE TO UPLOAD ***********************************************/
  // handleselectedFile = event => {
  //   this.setState({
  //     selectedFile: event.target.files[0]
  //   });
  //   event.target.value = null;
  // }



  // DOWNLOAD AND GET FILES DATA ***********************************************/
  // getFileDownloadOrFileMetadata = (index, metadata = false) => {
  //   let url = '/upload/file/' + this.props.files[index].uploadName;
  //   if (metadata) url += '?metadata=true';

  //   axios
  //     .get(url,
  //       {
  //         headers: {
  //           'X-Access-Token': this.props.files[index]._id
  //         }
  //       })
  //     .then(res => {
  //       if (!metadata) {
  //         FD(res, this.props.files[index].uploadName);
  //       } else {
  //         let output = '';
  //         let i = 0;
  //         const keys = Object.keys(res.data.upload);
  //         for (i = 0; i < keys.length; i++) {
  //           output += '<strong>' + keys[i] + ':</strong> ' + res.data.upload[keys[i]] + ' <br/> ';
  //         }
  //         this.setState({
  //           showModal: true,
  //           fileDetails: { __html: output }
  //         });
  //       }
  //     })
  //     .catch(err => {
  //       console.log('err', err)
  //     });
  // }

  // DELETE FILES ***********************************************/
  // deleteUpload = index => {
  //   const token = localStorage.getItem('token');
  //   const userId = localStorage.getItem('userId');
  //   const url = window.location.protocol
  //     + '//localhost:3000/upload/file/' + this.props.files[index]._id;
  //   axios.delete(
  //     url,
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': 'Bearer ' + token
  //       },
  //       data: {
  //         userId: userId
  //       }
  //     })
  //     .then(res => {
  //       let updatedFiles = [...this.props.files];
  //       updatedFiles.splice(index, 1);
  //       this.setState({
  //         files: updatedFiles
  //       });
  //     })
  //     .catch(err => {
  //       console.log('err', err)
  //     });
  // }

    // GET FILES ***********************************************/
  // getFiles = () =>  {
  //   const token = localStorage.getItem('token');
  //   const userId = localStorage.getItem('userId');

  //   axios
  //     .post(
  //       window.location.protocol + '//localhost:3000/upload/files',
  //       {
  //         userId: userId
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': 'Bearer ' + token
  //         }
  //       })
  //     .then(res => {
  //       this.setState({
  //         files: res.data.info.uploads
  //       });
  //     })
  //     .catch(err => {
  //       console.log('err', err)
  //     });
  // }
  
    // UPDATE FILES PRIVACY ***********************************************/
  // handleInputCheckbox = index => {
  //   const token = localStorage.getItem('token');
  //   const userId = localStorage.getItem('userId');
  //   const { privacy, uploadUrl } = this.props.files[index];

  //   axios
  //     .put(
  //       window.location.protocol + 
  //       '/upload/file/' + this.props.files[index]._id,
  //       {
  //         userId: userId,
  //         privacy: !privacy,
  //         uploadUrl: uploadUrl
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': 'Bearer ' + token
  //         }
  //       })
  //     .then(res => {
  //       const updatedFiles = [...this.props.files];
  //       updatedFiles[index] = res.data.upload
  //       this.setState({
  //         files: updatedFiles
  //       });
  //     })
  //     .catch(err => {
  //       console.log('err', err)
  //     });
  // }