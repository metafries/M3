import React from 'react'

export default function StatusLine({target}) {
    const status = target ? '#fc0000' : '#afadaa';

    return (
        <hr style={{borderColor: status}} />
    )
}
