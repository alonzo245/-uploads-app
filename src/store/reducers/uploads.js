import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  files: [],
  selectedFile: null,
  showModal: false,
  fileDetails: null
};

const fetchUploads = (state, action) => {
  return updateObject(state, { files: action.files });
};

const deleteUpload = (state, action) => {
  let updatedFiles = [...state.files];
  updatedFiles.splice(action.index, 1);
  return updateObject(state, { files: updatedFiles });
};

const updatePrivacyUpload = (state, action) => {
  const updatedFiles = [...state.files];
  updatedFiles[action.index] = action.uploadData
  return updateObject(state, { files: updatedFiles });
};

const prepareFileUpload = (state, action) => {
  return updateObject(state, { selectedFile: action.selectedFile });
};

const fetchUploadDataOrDownload = (state, action) => {
  let output = '';
  let i = 0;
  const keys = Object.keys(action.payload.uploadData);
  for (i = 0; i < keys.length; i++) {
    output += '<strong>' + keys[i] + ':</strong> ' + action.payload.uploadData[keys[i]] + ' <br/> ';
  }

  return updateObject(state, {
    showModal: action.payload.showModal,
    fileDetails: { __html: output }
  });
};

const uploadFile = (state, action) => {
  let files = state.files.slice();
  files.push(action.addedUploadFile);

  return updateObject(state, {
    files: files,
    selectedFile: null
  });
};

const hideModal = (state, action) => {
  return updateObject(state, {
    showModal: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HIDE_MODAL: return hideModal(state, action);
    case actionTypes.PREPARE_FILE_UPLOAD: return prepareFileUpload(state, action);
    case actionTypes.FETCH_UPLOADS: return fetchUploads(state, action);
    case actionTypes.DELETE_UPLOAD: return deleteUpload(state, action);
    case actionTypes.UPLOAD_FILE: return uploadFile(state, action);
    case actionTypes.UPDATE_UPLOAD_PRIVACY: return updatePrivacyUpload(state, action);
    case actionTypes.FETCH_UPLOAD_DATA_OR_DOWNLOAD: return fetchUploadDataOrDownload(state, action);
    default:
      return state;
  }
};

export default reducer;