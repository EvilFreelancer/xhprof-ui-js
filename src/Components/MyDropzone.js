import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { DropzoneArea } from 'material-ui-dropzone';
import { makeStyles } from '@mui/styles';
import { addFile } from '../Reducers/files';

const useStyles = makeStyles({
  dropzoneArea: {
    minHeight: '190px !important',
  },
});

/**
 * Just a small component, which should be hidden after file uploaded
 * @returns {JSX.Element}
 * @constructor
 */
export function MyDropzone() {
  const classes = useStyles();
  const dispatch = useDispatch();

  /**
   * After file dropped need to call parent method and save object of file
   * @type {(function(*=): void)|*}
   */
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((acceptedFile) => {
      console.log(acceptedFile);
      dispatch(addFile(acceptedFile));
    });
  }, []);

  return (
    <div>
      <DropzoneArea
        dropzoneClass={classes.dropzoneArea}
        onDrop={onDrop}
        filesLimit={100}
        showPreviewsInDropzone={false}
        showAlerts={false}
      />
    </div>
  );
}
