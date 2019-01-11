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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_UPLOADS: return fetchUploads(state, action);
    case actionTypes.DELETE_UPLOAD: return deleteUpload(state, action);
    default:
      return state;
  }
};

export default reducer;