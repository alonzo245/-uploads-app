import axios from '../../axios';
import FD from 'js-file-download';
import * as actionTypes from './actionTypes';

export const hideModal = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.HIDE_MODAL
    });
  };
};

export const deleteUploads = (index, uploadId) => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    axios.delete(
      '/upload/file/' + uploadId,
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
        dispatch({
          type: actionTypes.DELETE_UPLOAD,
          index: index,
        });
      })
      .catch(err => {
        console.log('err', err)
      });
  };
};

export const fetchUploads = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    axios
      .post(
        '/upload/files',
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
        dispatch({
          type: actionTypes.FETCH_UPLOADS,
          files: res.data.info.uploads
        });
      })
      .catch(err => {
        console.log('err', err)
      });
  };
};

export const updatePrivacyUpload = (index, uploadData) => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const { privacy, uploadUrl, _id } = uploadData

    axios
      .put(
        '/upload/file/' + _id,
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
        dispatch({
          type: actionTypes.UPDATE_UPLOAD_PRIVACY,
          index: index,
          uploadData: res.data.upload
        });
      })
      .catch(err => {
        console.log('err', err)
      });
  };
};

export const fetchUploadDataOrDownload = (fileData, getMetadata = false) => {
  return dispatch => {
    let url = '/upload/file/' + fileData.uploadName;
    if (getMetadata) url += '?metadata=true';

    axios
      .get(url,
        {
          headers: {
            'X-Access-Token': fileData._id
          }
        })
      .then(res => {

        if (!getMetadata) {
          FD(res, fileData.uploadName);
        } else {
          dispatch({
            type: actionTypes.FETCH_UPLOAD_DATA_OR_DOWNLOAD,
            payload: {
              uploadData: res.data.upload,
              showModal: true,
            }
          });
        }
      })
      .catch(err => {
        console.log('err', err)
      });
  };
};

export const prepareFileUpload = event => {
  return dispatch => {
    dispatch({
      type: actionTypes.PREPARE_FILE_UPLOAD,
      selectedFile: event.target.files[0]
    });
    event.target.value = null;
  };
};


export const uploadFileSubmit = (event, selectedFileUpload) => {
  return dispatch => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const formData = new FormData();

    formData.append('userId', userId);
    formData.append('privacy', false);
    formData.append('fileUpload', selectedFileUpload);

    axios
      .post(
        '/upload/file',
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

        dispatch({
          type: actionTypes.UPLOAD_FILE,
          addedUploadFile: res.data.upload
        });
      })
      .catch(err => {
        console.log('err', err)
      });
  };
};


