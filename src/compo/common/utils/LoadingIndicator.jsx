import { LinearProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import React from 'react'

const useProgressStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
}));

export default function LoadingIndicator() {
    const progressClasses = useProgressStyles();

    return (
        <LinearProgress className={progressClasses.root} />
    )
}
