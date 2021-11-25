import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { DropzoneAreaBase } from 'material-ui-dropzone';
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
export function MyDropzone({ dropzoneText = 'Drag and drop a files here or click' }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  /**
   * After file dropped need to call parent method and save object of file
   * @type {(function(*=): void)|*}
   */
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map(async (acceptedFile) => {
      try {
        // Parse JSON
        let jsonRaw = await acceptedFile.text();
        let jsonParsed = JSON.parse(jsonRaw);
        // Dispatch changes
        dispatch(addFile({ file: acceptedFile, json: jsonParsed }));
      } catch (e) {
        console.warn('Unable to parse JSON');
      }
    });
  }, []);

  return (
    <div>
      <DropzoneAreaBase
        dropzoneText={dropzoneText}
        dropzoneClass={classes.dropzoneArea}
        onDrop={onDrop}
        filesLimit={100}
        showPreviewsInDropzone={false}
        showAlerts={false}
        fileObjects={[]}
      />
    </div>
  );
}
