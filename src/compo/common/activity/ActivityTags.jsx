import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import { Button } from '@material-ui/core';

export default function ActivityTags({ category }) {
    return (
        <CardContent style={{ paddingLeft: 0, paddingTop: 0, }}>
            <Button
                size="small"
                style={{
                    color: '#afadaa',
                    borderRadius: 0,
                    marginTop: '15px',
                    padding: 0,
                }}
            >
                {`#${category}`}
            </Button>
        </CardContent>

    )
}
