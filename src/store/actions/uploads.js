import axios from '../../axios';
import * as actionTypes from './actionTypes';

export const deleteUploads = (index, uploadId) => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    const url = window.location.protocol
      + '/upload/file/' + uploadId;
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