import React from 'react'
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

const rejectStyle = {
    padding: '20px',
    borderStyle: 'solid',
    borderColor: '#DB3545',
    backgroundColor: '#f5f5f5',
};

export default function DropzoneWidget({ files, setFiles }) {
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
                            !isDragActive && <Typography>Drag 'n' drop a file here, or click to select a file</Typography>
                        }
                        {
                            !isDragReject && isDragActive &&
                            <Typography>Drop the file here ...</Typography>
                        }
                        {
                            isDragReject && <Typography>Invalid file type ...</Typography>
                        }
                    </div>                
                </section>
            )}
        </Dropzone>
    )
}