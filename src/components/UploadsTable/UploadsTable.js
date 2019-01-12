import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './UploadsTable.scss';
import { FaFileDownload, FaInfoCircle, FaTrashAlt } from "react-icons/fa";
import Moment from 'react-moment';

const Uploads = (props) => (
  
  <table className="table">
    <thead>
      <tr>
        <th scope="col">#</th>
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
      {props.files.map((file, index) => (
        <tr key={index}>
          <th scope="row">{index}</th>
          <td>{file.uploadName}</td>
          <td>
            <input type="checkbox" name="privacy"
              checked={file.privacy ? "checked" : ""}
              onChange={() => props.updatePrivacyUpload(index, file)}
            />
          </td>
          <td><Moment format="DD/MM/YYYY HH:MM" date={file.createdAt} /></td>
          <td><Moment format="DD/MM/YYYY HH:MM" date={file.updatedAt} /></td>
          <td>
            <FaFileDownload
              className="ActionBtn"
              onClick={() => props.getFileDownloadOrFileMetadata(index)}>
            </FaFileDownload>
          </td>
          <td>
            <FaInfoCircle
              className="ActionBtn"
              onClick={() => props.getFileDownloadOrFileMetadata(index, true)}>
            </FaInfoCircle>
          </td>
          <td>
            <FaTrashAlt
              className="ActionBtn"
              onClick={() => props.deleteUpload(index, file._id)}>
            </FaTrashAlt>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Uploads;