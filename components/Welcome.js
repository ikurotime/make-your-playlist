import React from 'react'

export default function Welcome(props) {
    return (
        <span className= 'WelcomeSection'>
            <img className='p_logo' src='./../logo.svg' width='500px'/>
            {props.button}
        </span>
    )
}
