import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Dropzone from 'react-dropzone'
import { Typography } from '@material-ui/core';

const baseStyle = {
    padding: '20px',
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'dashed',
    borderRadius: 0,
    backgroundColor: '#f5f5f5',
};

const activeStyle = {
    borderStyle: 'solid',
    borderColor: '#28A645',
    backgroundColor: '#f5f5f5',
};
const rejectStyle = {
    padding: '20px',
    borderStyle: 'solid',
    borderColor: '#DB3545',
    backgroundColor: '#f5f5f5',
};

export default function PhotoWidgetDropzone({ files, setFiles }) {

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        console.log(acceptedFiles);
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })))
    }, [setFiles])

    return (
        <Dropzone
            accept="image/*"
            onDrop={acceptedFiles => {
                // Do something with the files
                console.log(acceptedFiles);
                setFiles(acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })))
            }}>
            {({ getRootProps, getInputProps, isDragActive, isDragReject }) =>

            (
                <section >
                    <div {...getRootProps()} style={isDragReject ? { ...rejectStyle } : { ...baseStyle }}>
                        <input {...getInputProps()} />
                        {
                            !isDragActive && <Typography>Drag 'n' drop some files here, or click to select files</Typography>
                        }
                        {
                            !isDragReject && isDragActive &&
                            <Typography>Drop the files here ...</Typography>
                        }
                        {
                            isDragReject && <Typography>Invalid file type ...</Typography>
                        }
                    </div>
                    {files.length > 0 && files[0].name}
                </section>
            )}
        </Dropzone>
    )
}