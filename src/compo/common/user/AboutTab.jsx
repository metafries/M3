import { Typography } from '@material-ui/core'
import React from 'react'
import { format } from 'date-fns'

export default function AboutTab({ profile }) {
    return (
        <React.Fragment>
            <Typography style={{ margin: '20px', color: '#fff' }}>
                Joined {format(profile.createdAt, 'dd MMM yyyy')}
            </Typography>
            <Typography style={{ margin: '20px', color: '#fff' }}>
                {profile.description}
                src/compo/popups/ActivitySearch.jsx
  Line 12:22:   'KeyboardDatePicker' is defined but never used                                     no-unused-vars
  Line 41:10:   'filter' is assigned a value but never used                                        no-unused-vars
  Line 57:26:   Array.prototype.map() expects a value to be returned at the end of arrow function  array-callback-return
  Line 146:42:  Array.prototype.map() expects a value to be returned at the end of arrow function  array-callback-return
src/compo/popups/ActivitySearch.jsx
  Line 12:22:   'KeyboardDatePicker' is defined but never used                                     no-unused-vars
  Line 41:10:   'filter' is assigned a value but never used                                        no-unused-vars
  Line 57:26:   Array.prototype.map() expects a value to be returned at the end of arrow function  array-callback-return
  Line 146:42:  Array.prototype.map() expects a value to be returned at the end of arrow function  array-callback-return

            </Typography>
        </React.Fragment>
    )
}
