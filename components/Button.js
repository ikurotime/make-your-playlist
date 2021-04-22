import React from 'react'

export default function Button(props) {
    return (
        <button className='login_button' type={props.submit ? 'submit' : 'button'} onClick={props.action}>{props.title}</button>
    )
}
